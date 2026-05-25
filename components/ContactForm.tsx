"use client";

import { BadgeCheck } from "lucide-react";
import React, { useState, useEffect, useRef, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { fr } from "date-fns/locale";
import emailjs from "@emailjs/browser";

registerLocale("fr", fr);
setDefaultLocale("fr");

export type DayHours = {
  midi: { debut: string; fin: string };
  soir: { debut: string; fin: string };
  closedDay: boolean;
  closedDiner: boolean;
  closedLunch: boolean;
};

interface ContactFormProps {
  openingHours: DayHours[] | null;
  blockedDates: string[];
}

// Maps JS day (0=Sun…6=Sat) to DB opening_hours index (0=Mon…6=Sun)
function getHoursForDate(date: Date, openingHours: DayHours[]): DayHours | null {
  const dbIndex = (date.getDay() + 6) % 7;
  return openingHours[dbIndex] ?? null;
}

// Generates 30-min slots from debut (inclusive) to fin (exclusive)
function generateSlots(debut: string, fin: string): string[] {
  const [sh, sm] = debut.split(":").map(Number);
  const [eh, em] = fin.split(":").map(Number);
  const slots: string[] = [];
  let mins = sh * 60 + sm;
  const endMins = eh * 60 + em;
  while (mins < endMins) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    mins += 30;
  }
  return slots;
}

// Returns YYYY-MM-DD from a local date (avoids UTC shift issues)
function toLocalISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const ReservationForm = (props: ContactFormProps) => {
  const { openingHours, blockedDates } = props;

  const translations = {
    fr: {
      title: "Demande de réservation",
      fullNameLabel: "Nom complet",
      numberOfGuestsLabel: "Nombre de personnes",
      eventDateLabel: "Date",
      eventTimeLabel: "Heure",
      specialRequestsLabel: "Demandes spéciales",
      submitButton: "ENVOYER LA DEMANDE",
      afterSentMessage: "Merci pour votre demande de réservation ! Un email de confirmation vous sera envoyé sous peu. Veuillez vérifier votre boîte mail.",
      alertMaxNbGuests: "Pour toute réservation supérieure à 10 couverts, veuillez nous contacter à cette adresse mail : ",
    },
    en: {
      title: "Reservation request",
      fullNameLabel: "Full name",
      numberOfGuestsLabel: "Number of people",
      eventDateLabel: "Date",
      eventTimeLabel: "Time",
      specialRequestsLabel: "Special requests",
      submitButton: "SEND REQUEST",
      afterSentMessage: "Thank you for your reservation request! A confirmation email will be sent shortly. Please check your inbox.",
      alertMaxNbGuests: "For reservations of more than 10 covers, please contact us at: ",
    },
    es: {
      title: "Solicitud de reserva",
      fullNameLabel: "Nombre completo",
      numberOfGuestsLabel: "Número de personas",
      eventDateLabel: "Fecha",
      eventTimeLabel: "Hora",
      specialRequestsLabel: "Solicitudes especiales",
      submitButton: "ENVIAR SOLICITUD",
      afterSentMessage: "Gracias por su solicitud de reserva. Un correo de confirmación le será enviado en breve.",
      alertMaxNbGuests: "Para reservas de más de 10 comensales, contáctenos en: ",
    },
    it: {
      title: "Richiesta di prenotazione",
      fullNameLabel: "Nome completo",
      numberOfGuestsLabel: "Numero di persone",
      eventDateLabel: "Data",
      eventTimeLabel: "Ora",
      specialRequestsLabel: "Richieste speciali",
      submitButton: "INVIA LA RICHIESTA",
      afterSentMessage: "Grazie per la tua richiesta di prenotazione! Una email di conferma ti sarà inviata a breve.",
      alertMaxNbGuests: "Per prenotazioni superiori a 10 coperti, contattateci all'indirizzo: ",
    },
  };

  const [selectedLanguage, setSelectedLanguage] = useState("fr");
  const translation = translations[selectedLanguage as keyof typeof translations];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    numberOfGuests: "",
    eventDate: new Date(),
    eventTime: "",
    specialRequests: "",
  });

  const [succeeded, setSucceeded] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedValue, setSelectedValue] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    setSelectedValue("");
  }, [selectedDate]);

  const timeSlots = useMemo(() => {
    if (!openingHours || !selectedDate) return [];
    const dayH = getHoursForDate(selectedDate, openingHours);
    if (!dayH || dayH.closedDay) return [];
    const slots: string[] = [];
    if (!dayH.closedLunch && dayH.midi?.debut) {
      slots.push(...generateSlots(dayH.midi.debut, dayH.midi.fin));
    }
    if (!dayH.closedDiner && dayH.soir?.debut) {
      slots.push(...generateSlots(dayH.soir.debut, dayH.soir.fin));
    }
    return slots;
  }, [selectedDate, openingHours]);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) {
      console.error("Le formulaire n'est pas disponible !");
      return;
    }
    const formElement = formRef.current;
    Promise.all([
      emailjs.sendForm("service_carbo", "template_resa_001", formElement, "Bdh3AwRMePW399mo-"),
      emailjs.sendForm("service_carbo", "template_resa_002", formElement, "Bdh3AwRMePW399mo-"),
    ])
      .then(() => {
        formRef.current?.reset();
        setSucceeded(true);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi des emails :", error);
      });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .date-past {
          background-color: #f3f4f6 !important;
          color: #9ca3af !important;
          cursor: not-allowed !important;
        }
        .date-closed {
          background-color: #fee2e2 !important;
          color: #991b1b !important;
          position: relative;
        }
        .date-closed::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 80%;
          height: 2px;
          background-color: #991b1b;
          transform: translate(-50%, -50%) rotate(-45deg);
        }
        .react-datepicker__day--disabled {
          cursor: not-allowed !important;
        }
      ` }} />
      {succeeded ? (
        <div className="flex flex-col lg:flex-row w-full h-96 justify-center px-4 items-center lg:space-x-3 bg-whiteSmokedBG">
          <BadgeCheck className="text-darkColor" />
          <p className="font-RedHatMonoLight text-darkColor text-sm text-center">
            {translation.afterSentMessage}
          </p>
        </div>
      ) : (
        <div className="relative flex flex-col lg:flex-row justify-center items-center lg:space-x-32 space-y-16 py-20 bg-whiteSmokedBG">
          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="space-y-8 lg:w-1/3 w-5/6 z-20"
          >
            <input type="hidden" name="company" value="El Bodegon" />
            <input type="hidden" name="emailCompany" value="elbodegon@gmail.com" />
            <input type="hidden" name="reservationType" value="EN ATTENTE DE CONFIRMATION" />
            <input type="hidden" name="reservationComment" value="Nous avons bien pris en compte votre demande et elle sera traitée dans les plus brefs délais. Votre réservation ne sera confirmée qu'après réception d'un mail de notre part. Merci de votre patience, nous avons hâte de vous accueillir !" />
            <input type="hidden" name="reservationComment2" value=" " />

            <div className="flex items-center justify-between lg:flex-row flex-col-reverse gap-4">
              <h3 className="font-RedHatMonoLight text-darkColor text-3xl tracking-wide leading-none">
                {translation.title}
              </h3>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="font-RedHatMonoLight border border-darkColor/30 text-sm px-2 py-1 bg-transparent text-darkColor focus:outline-none focus:border-darkColor"
              >
                <option value="fr">🇫🇷</option>
                <option value="en">🇬🇧</option>
                <option value="es">🇦🇷</option>
                <option value="it">🇮🇹</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="fullName"
                className="block font-RedHatMonoLight text-darkColor/70 text-xs tracking-widest uppercase mb-1"
              >
                {translation.fullNameLabel}
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-darkColor/30 bg-transparent font-RedHatMonoLight text-darkColor text-sm focus:outline-none focus:border-darkColor"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-RedHatMonoLight text-darkColor/70 text-xs tracking-widest uppercase mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-darkColor/30 bg-transparent font-RedHatMonoLight text-darkColor text-sm focus:outline-none focus:border-darkColor"
                required
              />
            </div>

            <div className="bg-darkColor/90 px-4 py-3 font-RedHatMonoLight text-goldColor/80 text-xs leading-relaxed">
              {translation.alertMaxNbGuests}
              <a
                href="mailto:elbodegon@gmail.com"
                className="text-goldColor underline ml-1"
              >
                elbodegon@gmail.com
              </a>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:gap-6 gap-8">
              <div className="lg:w-1/2 w-full">
                <label
                  htmlFor="numberOfGuests"
                  className="block font-RedHatMonoLight text-darkColor/70 text-xs tracking-widest uppercase mb-1"
                >
                  {translation.numberOfGuestsLabel}
                </label>
                <input
                  type="number"
                  id="numberOfGuests"
                  name="numberOfGuests"
                  value={formData.numberOfGuests}
                  onChange={handleChange}
                  min={1}
                  max={10}
                  className="mt-1 block w-full px-4 py-3 border border-darkColor/30 bg-transparent font-RedHatMonoLight text-darkColor text-sm focus:outline-none focus:border-darkColor"
                  required
                />
              </div>

              <div className="lg:w-1/2 w-full">
                <label
                  htmlFor="eventDate"
                  className="w-full block font-RedHatMonoLight text-darkColor/70 text-xs tracking-widest uppercase mb-1"
                >
                  {translation.eventDateLabel}
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => date && setSelectedDate(date)}
                  filterDate={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    if (date < today) return false;
                    if (blockedDates.includes(toLocalISODate(date))) return false;
                    if (openingHours) {
                      const dayH = getHoursForDate(date, openingHours);
                      if (dayH?.closedDay) return false;
                    }
                    return true;
                  }}
                  dayClassName={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    if (date < today) return "date-past";
                    if (blockedDates.includes(toLocalISODate(date))) return "date-closed";
                    if (openingHours) {
                      const dayH = getHoursForDate(date, openingHours);
                      if (dayH?.closedDay) return "date-closed";
                    }
                    return "";
                  }}
                  dateFormat="dd/MM/yyyy"
                  locale="fr"
                  minDate={new Date()}
                  placeholderText="Sélectionner une date"
                  className="w-full px-4 py-3 border border-darkColor/30 bg-transparent font-RedHatMonoLight text-darkColor text-sm focus:outline-none focus:border-darkColor"
                  required
                />
                <input
                  type="hidden"
                  name="eventDate"
                  value={
                    selectedDate
                      ? selectedDate.toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : ""
                  }
                />
              </div>

              <div className="lg:w-1/2 w-full">
                <label
                  htmlFor="eventTime"
                  className="w-full block font-RedHatMonoLight text-darkColor/70 text-xs tracking-widest uppercase mb-1"
                >
                  {translation.eventTimeLabel}
                </label>
                <select
                  id="eventTime"
                  name="eventTime"
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                  disabled={timeSlots.length === 0}
                  className="mt-1 block w-full px-4 py-3 border border-darkColor/30 bg-whiteSmokedBG font-RedHatMonoLight text-darkColor text-sm focus:outline-none focus:border-darkColor disabled:opacity-40 disabled:cursor-not-allowed appearance-none"
                  required
                >
                  <option value="" disabled>
                    {selectedDate ? "Choisir une heure" : "Sélectionner d'abord une date"}
                  </option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="specialRequests"
                className="block font-RedHatMonoLight text-darkColor/70 text-xs tracking-widest uppercase mb-1"
              >
                {translation.specialRequestsLabel}
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                rows={4}
                value={formData.specialRequests}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-darkColor/30 bg-transparent font-RedHatMonoLight text-darkColor text-sm focus:outline-none focus:border-darkColor resize-none"
              />
            </div>

            <button
              type="submit"
              className="font-RedHatMonoLight text-xs tracking-widest bg-darkColor text-goldColor border-2 border-darkColor px-8 py-3 hover:bg-transparent hover:text-darkColor transition-colors duration-200 uppercase"
            >
              {translation.submitButton}
            </button>
          </form>

          <div className="z-30 flex flex-col items-center gap-4">
            <img
              src="img/deco/argentina-flag.webp"
              alt="El Bodegon - Restaurant Argentin à Toulouse"
              className="rounded-full border-4 border-goldColor w-48 h-48 object-cover shadow-2xl"
            />
            <div className="flex flex-col items-center gap-1">
              <p className="font-RedHatMonoLight text-darkColor text-lg border-t-2 border-b-2 border-darkColor py-1 tracking-widest">
                EL BODEGON
              </p>
              <p className="font-RedHatMonoLight text-darkColor/40 text-xs tracking-wider">
                Restaurant Argentin · Toulouse
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservationForm;

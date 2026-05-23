"use client";
import { BadgeCheck } from "lucide-react";
import React, { useState , useEffect , useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { fr } from "date-fns/locale";
import emailjs from "@emailjs/browser";

registerLocale("fr", fr);
setDefaultLocale("fr");

const ReservationForm = () => {
  const translations = {
    fr: {
      title: "Demande de réservation",
      fullNameLabel: "Nom complet",
      emailLabel: "Email",
      numberOfGuestsLabel: "Nombre de personnes",
      eventDateLabel: "Date",
      infoDateLabel: "(Fermé lundi et dimanche)",
      infoDateLabelSummer: "(Fermé le dimanche)",
      eventTimeLabel: "Heure",

      specialRequestsLabel: "Demandes spéciales",
      submitButton: "ENVOYER LA DEMANDE",

      afterSentMessage: `Merci pour votre demande de réservation ! Un email de confirmation vous sera envoyé sous peu. Veuillez vérifier votre boîte mail.`,

      alertRestaurantClose: "Restaurant fermé tous les lundis et dimanches.",

      alertMaxNbGuests: "Pour toute réservation supérieure à 10 couverts, veuilez nous contacter à cette adresse mail : ",

      alertHolidaysSelected: "Restaurant fermé du 21 décembre 2025 au 5 février 2026.",
      alertBasicClosedDays: "Restaurant fermé le lundi et le dimanche.",
      alertSummerClosedDays: "Restaurant fermé le lundi.",
      alertPastSelectedDate: "La date sélectionnée est passée.",
    },
    en: {
      title: "Reservation request",
      fullNameLabel: "Full name",
      emailLabel: "Email",
      numberOfGuestsLabel: "Number of people",
      eventDateLabel: "Date",
      infoDateLabel: "(Closed on Monday and Sunday)",
      infoDateLabelSummer: "(Closed on Sunday)",
      eventTimeLabel: "Time",

      specialRequestsLabel: "Special requests",
      submitButton: "SEND REQUEST",

      afterSentMessage: `Merci pour votre demande de réservation ! Un email de confirmation vous sera envoyé sous peu. Veuillez vérifier votre boîte mail.`,

      alertRestaurantClose: "Restaurant closed every Monday and Sunday.",

      alertMaxNbGuests: "For reservations of more than 10 covers, please contact us at this email address: ",

      alertHolidaysSelected: "Restaurant closed from December 21, 2025 to February 5, 2026.",
      alertBasicClosedDays: "Restaurant closed on Monday and Sunday.",
      alertSummerClosedDays: "Restaurant closed on Monday.",
      alertPastSelectedDate: "The selected date is in the past.",
    },
    es: {
      title: "Solicitud de reserva",
      fullNameLabel: "Nombre completo",
      emailLabel: "Correo electrónico",
      numberOfGuestsLabel: "Número de personas",
      eventDateLabel: "Fecha",
      infoDateLabel: "(Cerrado los lunes y domingos)",
      infoDateLabelSummer: "(Cerrado los domingos)",
      eventTimeLabel: "Hora",

      specialRequestsLabel: "Solicitudes especiales",
      submitButton: "ENVIAR SOLICITUD",

      afterSentMessage: `¡Gracias por su solicitud de reserva! Un correo electrónico de confirmación le será enviado en breve. Por favor, verifique su bandeja de entrada.`,

      alertRestaurantClose: "Restaurante cerrado todos los lunes y domingos.",

      alertMaxNbGuests: "Para reservas de más de 10 comensales, póngase en contacto con nosotros en esta dirección de correo electrónico: ",

      alertHolidaysSelected: "Restaurante cerrado del 21 de diciembre de 2025 al 5 de febrero de 2026.",
      alertBasicClosedDays: "Restaurante cerrado los lunes y domingos.",
      alertSummerClosedDays: "Restaurante cerrado los lunes.",
      alertPastSelectedDate: "La fecha seleccionada ya ha pasado.",
    },
    it: {
      title: "Richiesta di prenotazione",
      fullNameLabel: "Nome completo",
      emailLabel: "Email",
      numberOfGuestsLabel: "Numero di persone",
      eventDateLabel: "Data",
      infoDateLabel: "(Chiuso il lunedì e la domenica)",
      infoDateLabelSummer: "(Chiuso la domenica)",
      eventTimeLabel: "Ora",

      specialRequestsLabel: "Richieste speciali",
      submitButton: "INVIA LA RICHIESTA",

      afterSentMessage: `Grazie per la tua richiesta di prenotazione! Una email di conferma ti sarà inviata a breve. Controlla la tua casella di posta.`,

      alertRestaurantClose: "Ristorante chiuso tutti i lunedì e domeniche.",

      alertMaxNbGuests: "Per prenotazioni superiori a 10 coperti, vi preghiamo di contattarci all'indirizzo e-mail: ",

      alertHolidaysSelected: "Ristorante chiuso dal 21 dicembre 2025 al 5 febbraio 2026.",
      alertBasicClosedDays: "Ristorante chiuso il lunedì e la domenica.",
      alertSummerClosedDays: "Ristorante chiuso il lunedì.",
      alertPastSelectedDate: "La data selezionata è passata.",
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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    console.log(formData.eventDate, formData.eventTime);
  };

  // const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const dateInput = document.getElementById("datePicker");

    const handleDateChange = (e: any) => {
      const date = new Date(e.target.value);
      const day = date.getDay();
      const month = date.getMonth();

      const startHolidays = new Date(2025, 11, 21);   // 21 décembre 2025 (mois 11)
      const endHolidays = new Date(2026, 1, 5);       // 5 février 2026 (mois 1)
      const today = new Date();

      if (date >= startHolidays && date <= endHolidays)
      {
        e.target.value = "";
        alert(translation.alertHolidaysSelected);
      }
      else if ((day == 0 && month == 6) || (day == 0 && month == 7))
      {
        e.target.value = "";
        alert(translation.alertSummerClosedDays);
      }
      else if ((day === 0 || day === 1) && (month != 6) && (month != 7))
      {
        e.target.value = "";
        alert(translation.alertBasicClosedDays);
      }
      else if (date < today)
      {
        e.target.value = "";
        alert(translation.alertPastSelectedDate);
      }
    };

    if (dateInput)
    {
      dateInput.addEventListener("change", handleDateChange);
    }

    return () => {
      if (dateInput)
      {
        dateInput.removeEventListener("change", handleDateChange);
      }
    };
  }, []);



  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) {
        console.error("Le formulaire n'est pas disponible !");
        return;
    }

    const formElement = formRef.current;

    Promise.all([
        emailjs.sendForm("service_carbo", "template_resa_001", formElement, "Bdh3AwRMePW399mo-"),
        emailjs.sendForm("service_carbo", "template_resa_002", formElement, "Bdh3AwRMePW399mo-")
    ])
    .then(() => {
        formRef.current?.reset();
        setSucceeded(true);
    })
    .catch(error => {
        console.error("Erreur lors de l'envoi des emails :", error);
    });
};

    const [isOpen, setIsOpen] = useState(false); 
    const [selectedValue, setSelectedValue] = useState("");
  
    const options = ["12:00", "12:30", "13:00", "13:30", "14:00",
                     "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"
                    ];
  
    const handleSelect = (value: string) => {
      setSelectedValue(value);
      setIsOpen(false);
    };
  
    const toggleDropdown = () => {
      setIsOpen((prev) => !prev);
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
            <input type="hidden" name="reservationComment" value="Nous avons bien pris en compte votre demande et elle sera traitée dans les plus brefs délais. Votre réservation ne sera confirmée qu’après réception d’un mail de notre part. Merci de votre patience, nous avons hâte de vous accueillir !" />
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
                    const day = date.getDay();
                    const month = date.getMonth();
                    const startHolidays = new Date(2025, 11, 21);
                    const endHolidays = new Date(2026, 1, 5);
                    const isHoliday = date >= startHolidays && date <= endHolidays;
                    const isSummerSunday = (day === 0 && month === 6) || (day === 0 && month === 7);
                    const isRegularClosed = (day === 0 || day === 1) && month !== 6 && month !== 7;
                    const isExceptionallyClosed = (date.getDate() === 12 && date.getMonth() === 4) || (date.getDate() === 13 && date.getMonth() === 4) || (date.getDate() === 14 && date.getMonth() === 4) || (date.getDate() === 15 && date.getMonth() === 4) || (date.getDate() === 16 && date.getMonth() === 4);
                    const isExceptionallyOpen = (date.getDate() === 10 && date.getMonth() === 4) || (date.getDate() === 11 && date.getMonth() === 4);
                    const isClosed = (isHoliday || isSummerSunday || isRegularClosed) && !isExceptionallyOpen || isExceptionallyClosed;
                    return !isClosed;
                  }}
                  dayClassName={(date) => {
                    const day = date.getDay();
                    const month = date.getMonth();
                    const startHolidays = new Date(2025, 11, 21);
                    const endHolidays = new Date(2026, 1, 9);
                    const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
                    const isHoliday = date >= startHolidays && date <= endHolidays;
                    const isSummerSunday = (day === 0 && month === 6) || (day === 0 && month === 7);
                    const isRegularClosed = (day === 0 || day === 1) && month !== 6 && month !== 7;
                    const isExceptionallyClosed = (date.getDate() === 12 && date.getMonth() === 4) || (date.getDate() === 13 && date.getMonth() === 4) || (date.getDate() === 14 && date.getMonth() === 4) || (date.getDate() === 15 && date.getMonth() === 4) || (date.getDate() === 16 && date.getMonth() === 4);
                    const isExceptionallyOpen = (date.getDate() === 10 && date.getMonth() === 4);
                    const isClosed = (isHoliday || isSummerSunday || isRegularClosed) && !isExceptionallyOpen || isExceptionallyClosed;
                    if (isPast) return "date-past";
                    if (isClosed) return "date-closed";
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
                  value={selectedDate ? selectedDate.toLocaleDateString(‘fr-FR’, {
                    day: ‘2-digit’,
                    month: ‘2-digit’,
                    year: ‘numeric’
                  }) : ‘’}
                />
              </div>

              <div className="relative lg:w-1/2 w-full">
                <label
                  htmlFor="eventTime"
                  className="w-full block font-RedHatMonoLight text-darkColor/70 text-xs tracking-widest uppercase mb-1"
                >
                  {translation.eventTimeLabel}
                </label>
                <input
                  type="text"
                  name="eventTime"
                  value={selectedValue}
                  onClick={toggleDropdown}
                  onChange={(e) => setSelectedValue(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-darkColor/30 bg-transparent font-RedHatMonoLight text-darkColor text-sm focus:outline-none focus:border-darkColor cursor-pointer"
                  placeholder="Choisir une heure"
                  readOnly
                />
                {isOpen && (
                  <ul
                    className="absolute w-full mt-1 bg-whiteSmokedBG border border-darkColor/20 shadow-lg z-10"
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    {options.map((option, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 cursor-pointer font-RedHatMonoLight text-darkColor text-sm hover:bg-darkColor hover:text-goldColor transition-colors"
                        onClick={() => handleSelect(option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
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

import { createClient } from "@supabase/supabase-js";
import { Instagram, Mail, Phone } from "lucide-react";


const DAYS = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

type DayHours = {
  midi: { debut: string; fin: string };
  soir: { debut: string; fin: string };
  closedDay: boolean;
  closedDiner: boolean;
  closedLunch: boolean;
};

async function getOpeningHours(): Promise<DayHours[] | null> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      global: {
        fetch: (url, options) =>
          fetch(url, { ...options, cache: "no-store" }),
      },
    }
  );

  const { data, error } = await supabase
    .from("opening_hours")
    .select("hours")
    .eq("restaurant_id", process.env.RESTAURANT_ID!)
    .single();

  if (error || !data) return null;
  return data.hours as DayHours[];
}

async function Footer() {
  const hours = await getOpeningHours();

  return (
    <footer className="w-full bg-darkColor border-t border-goldColor/20">
      <div className="w-5/6 mx-auto py-16 grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">

        {/* HORAIRES */}
        <div className="flex flex-col items-center lg:items-start">
          <h4 className="font-RedHatMonoLight text-goldColor tracking-widest uppercase text-xs border-b border-goldColor/30 pb-3 mb-6 w-full text-center lg:text-left">
            Horaires
          </h4>
          {hours ? (
            <ul className="w-full space-y-3">
              {DAYS.map((day, i) => {
                const d = hours[i];
                return (
                  <li key={day} className="flex justify-between items-start">
                    <span className="font-RedHatMonoLight text-goldColor/50 uppercase tracking-wider text-xs w-24">
                      {day}
                    </span>
                    {d.closedDay ? (
                      <span className="font-RedHatMonoLight text-goldColor/25 text-xs tracking-wider">
                        Fermé
                      </span>
                    ) : (
                      <div className="flex flex-col items-end gap-0.5">
                        {!d.closedLunch && d.midi.debut && (
                          <span className="font-RedHatMonoLight text-goldColor text-xs">
                            {d.midi.debut} – {d.midi.fin}
                          </span>
                        )}
                        {!d.closedDiner && d.soir.debut && (
                          <span className="font-RedHatMonoLight text-goldColor text-xs">
                            {d.soir.debut} – {d.soir.fin}
                          </span>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="font-RedHatMonoLight text-goldColor/30 text-xs tracking-wider">
              Horaires non disponibles
            </p>
          )}
        </div>

        {/* LOGO & BRAND */}
        <div className="flex flex-col items-center justify-start gap-6">
          <img
            src="img/deco/argentina-flag.webp"
            alt="El Bodegon - Restaurant Argentin à Toulouse"
            className="rounded-full border-4 border-goldColor w-28 h-28 object-cover"
          />
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-goldColor font-RedHatMonoLight text-xl border-t-2 border-b-2 border-goldColor py-1 tracking-widest">
              EL BODEGON
            </h2>
            <p className="text-goldColor/40 font-RedHatMonoLight text-xs tracking-wider">
              Restaurant Argentin · Toulouse
            </p>
          </div>
        </div>

        {/* CONTACT & ADRESSE */}
        <div className="flex flex-col items-center lg:items-end gap-10">
          <div className="flex flex-col items-center lg:items-end w-full">
            <h4 className="font-RedHatMonoLight text-goldColor tracking-widest uppercase text-xs border-b border-goldColor/30 pb-3 mb-6 w-full text-center lg:text-right">
              Contact
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:elbodegon@gmail.com"
                  className="flex items-center gap-2 font-RedHatMonoLight text-goldColor/60 hover:text-goldColor text-xs transition-colors"
                >
                  <Mail size={13} />
                  elbodegon@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+33663957419"
                  className="flex items-center gap-2 font-RedHatMonoLight text-goldColor/60 hover:text-goldColor text-xs transition-colors"
                >
                  <Phone size={13} />
                  +33 6 63 95 74 19
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/elbodegon.toulouse31/?hl=fr"
                  className="flex items-center gap-2 font-RedHatMonoLight text-goldColor/60 hover:text-goldColor text-xs transition-colors"
                >
                  <Instagram size={13} />
                  @elbodegon.toulouse31
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center lg:items-end w-full">
            <h4 className="font-RedHatMonoLight text-goldColor tracking-widest uppercase text-xs border-b border-goldColor/30 pb-3 mb-6 w-full text-center lg:text-right">
              Adresse
            </h4>
            <a
              href="https://www.google.com/maps/place/El+bodeg%C3%B3n/@43.594756,1.4411018,677m/data=!3m2!1e3!4b1!4m6!3m5!1s0x12aebd6fd0c0bdd3:0x8bb3a8d1c544df7!8m2!3d43.5947521!4d1.4436767!16s%2Fg%2F11xfqlzgcp!5m1!1e4?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D"
              className="font-RedHatMonoLight text-goldColor/60 hover:text-goldColor text-xs transition-colors text-center lg:text-right"
            >
              6 rue de la Fonderie
              <br />
              31000, Toulouse
            </a>
          </div>
        </div>

      </div>

      <div className="border-t border-goldColor/10 py-4">
        <p className="text-center font-RedHatMonoLight text-goldColor/25 text-xs tracking-widest">
          © Pablo ORTEGA – 2025
        </p>
      </div>
    </footer>
  );
}

export default Footer;

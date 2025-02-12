import "./Login.css";
import { Trans } from "react-i18next";
import { LanguageSwitch } from "@/components/Common/LanguageSwitch";
import { useTranslation } from "react-i18next";

export const Login = () => {
  const { t } = useTranslation();

  return (
    <section className="relative flex flex-col items-start justify-center min-h-screen lg:px-[5vw]">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-[-1]" />

      <div className="absolute top-5 right-5">
        <LanguageSwitch />
      </div>
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-[-2]"
        autoPlay
        loop
        muted
        aria-label="Background video showing lifestyle fashion"
      >
        <source
          src="https://res.cloudinary.com/dzyhvxuts/video/upload/v1739366781/videos/vdbbdnrjuheallhhnocy.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="p-6 flex flex-col w-full items-center md:items-start">
        <h1 className="font-bold w-full text-center md:text-start text-wrap balance text-white">
          <Trans>{t("login.title")}</Trans>
        </h1>

        <h2 className="opacity-70 mt-4 text-center md:text-start w-full lg:max-w-2xl text-white">
          {t("login.subtitle")}
        </h2>

        <div className="flex flex-col md:flex-row gap-2 mt-10 w-full max-w-md font-bold">
          <button
            className="w-full md:w-1/2 bg-[#0DBC73] text-white py-2 rounded-md transition-all duration-300"
            aria-label="Sign in"
          >
            {t("login.sign_in")}
          </button>
          <button
            className={`w-full md:w-1/2 py-2 rounded-md transition-all duration-300`}
            aria-label="Create an Account"
          >
            {t("login.create_account")}
          </button>
        </div>
      </div>
    </section>
  );
};

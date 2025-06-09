import contactBg from "/contact-bg.jpg";

const Contact = () => {
  return (
    <div
      className={`relative h-[50dvh] bg-center bg-no-repeat bg-cover flex flex-col gap-10 justify-center items-center`}
      style={{ backgroundImage: `url(${contactBg})` }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />

      <h1 className="text-white z-1 font-bold text-4xl">Contact Us!</h1>
      <div className="z-1 p-2 rounded-lg border border-gray-400 backdrop-blur-xs text-shadow-lg">
        <h1 className="text-white text-center text-2xl font-bold">
          Postal Address <br /> Jl. Dadaha No.18, kahuripan, kec.Tawang, kota
          Tasikmalaya, Jawa Barat
        </h1>
        <h1 className="text-white text-center text-2xl font-bold">
          Phone Number <br /> (+62) 813-2065-5012
        </h1>
      </div>
    </div>
  );
};

export default Contact;

const Footer = () => {
  return (
    <>
      <div className="sm:flex sm:justify-end text-[#757575] font-normal">
        <ul className="grid grid-cols-2 justify-items-center sm:flex sm:items-center sm:gap-x-4 text-sm gap-y-4 p-10 ">
          <li className="cursor-pointer hover:underline">Help</li>
          <li className="cursor-pointer hover:underline">Status</li>
          <li className="cursor-pointer hover:underline">Writers</li>
          <li className="cursor-pointer hover:underline">Blog</li>
          <li className="cursor-pointer hover:underline">Careers</li>
          <li className="cursor-pointer hover:underline">Privacy</li>
          <li className="cursor-pointer hover:underline">Terms</li>
          <li className="cursor-pointer hover:underline">About</li>
          <li className="cursor-pointer hover:underline">Knowable</li>
        </ul>
      </div>
    </>
  );
};

export default Footer;

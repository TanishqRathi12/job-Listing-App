import { FaFacebook, FaYoutube, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-black p-4">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:px-48 px-4">
                <p className="text-white opacity-60 text-center sm:text-left">
                    @ 2021 Jobpilot - Job Portal. All rights Reserved
                </p>
                <div className="flex space-x-3 opacity-60 mt-4 sm:mt-0">
                    <FaFacebook className="text-white" size={25} />
                    <FaYoutube className="text-white" size={25} />
                    <FaInstagram className="text-white" size={25} />
                    <FaTwitter className="text-white" size={25} />
                </div>
            </div>
        </footer>
    );
}

export default Footer;

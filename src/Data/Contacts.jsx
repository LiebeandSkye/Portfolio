import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Information = [
        {
            name: '/home/KryRithisak',
            type: 'link',
            blue: false,
            icon: <FaMapMarkerAlt />,
        },
        {
            name: 'kryrithisak@gmail.com',
            url: 'kryrithisak@gmail.com',
            type: 'email',
            icon: <MdOutlineMail />,
            blue: true,
        },
        {
            name: 'SkyeandLiebe',
            url: 'https://github.com/LiebeandSkye',
            type: 'link',
            icon: <FaGithub />,
            blue: true,
        },
        {
            name: 'Kry Rithisak',
            url: 'https://www.linkedin.com/in/kry-rithisak-b2b66824a',
            type: 'link',
            icon: <FaLinkedin />,
            blue: true,
        },
        {
            name: 'Skyeoridk',
            url: 'https://www.instagram.com/skyeoridk?igsh=MWNwYzRiNDM0cDhycA==',
            type: 'link',
            icon: <CiInstagram />,
            blue: true,
        },
        {
            name: 'Rithi Sak',
            url: 'https://www.facebook.com/share/1FiTy3pjKz/',
            type: 'link',
            icon: <FaFacebook />,
            blue: true,
        },
        {
            name: 'i_amthe0newhoasked',
            type: 'link',
            icon: <FaDiscord />,
            blue: false,
            copy: true,
        },
    ];
    export default Information;
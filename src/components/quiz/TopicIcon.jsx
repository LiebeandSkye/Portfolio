import React from 'react';
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaJava,
  FaPython,
  FaNodeJs,
  FaDatabase,
  FaCloud,
  FaBrain,
} from 'react-icons/fa6';
import { SiTypescript, SiNextdotjs } from 'react-icons/si';
import { TbApi } from 'react-icons/tb';

export const TOPIC_ICON_MAP = {
  react: {
    icon: FaReact,
    color: '#61DAFB',
    bg: 'rgba(97, 218, 251, 0.12)',
    border: 'rgba(97, 218, 251, 0.3)',
  },
  html: {
    icon: FaHtml5,
    color: '#E34F26',
    bg: 'rgba(227, 79, 38, 0.12)',
    border: 'rgba(227, 79, 38, 0.3)',
  },
  css: {
    icon: FaCss3Alt,
    color: '#1572B6',
    bg: 'rgba(21, 114, 182, 0.12)',
    border: 'rgba(21, 114, 182, 0.3)',
  },
  javascript: {
    icon: FaJs,
    color: '#F7DF1E',
    bg: 'rgba(247, 223, 30, 0.12)',
    border: 'rgba(247, 223, 30, 0.3)',
  },
  java: {
    icon: FaJava,
    color: '#EA2D2E',
    bg: 'rgba(234, 45, 46, 0.12)',
    border: 'rgba(234, 45, 46, 0.3)',
  },
  python: {
    icon: FaPython,
    color: '#38BDF8',
    bg: 'rgba(56, 189, 248, 0.12)',
    border: 'rgba(56, 189, 248, 0.3)',
  },
  nodejs: {
    icon: FaNodeJs,
    color: '#5FA04E',
    bg: 'rgba(95, 160, 78, 0.12)',
    border: 'rgba(95, 160, 78, 0.3)',
  },
  database: {
    icon: FaDatabase,
    color: '#0284C7',
    bg: 'rgba(2, 132, 199, 0.12)',
    border: 'rgba(2, 132, 199, 0.3)',
  },
  api: {
    icon: TbApi,
    color: '#0D9488',
    bg: 'rgba(13, 148, 136, 0.12)',
    border: 'rgba(13, 148, 136, 0.3)',
  },
  core_concepts: {
    icon: FaBrain,
    color: '#A855F7',
    bg: 'rgba(168, 85, 247, 0.12)',
    border: 'rgba(168, 85, 247, 0.3)',
  },
  cloud: {
    icon: FaCloud,
    color: '#38BDF8',
    bg: 'rgba(56, 189, 248, 0.12)',
    border: 'rgba(56, 189, 248, 0.3)',
  },
  typescript: {
    icon: SiTypescript,
    color: '#3178C6',
    bg: 'rgba(49, 120, 198, 0.12)',
    border: 'rgba(49, 120, 198, 0.3)',
  },
  nextjs: {
    icon: SiNextdotjs,
    color: 'currentColor',
    bg: 'rgba(120, 120, 120, 0.12)',
    border: 'rgba(120, 120, 120, 0.3)',
  },
};

const TopicIcon = ({ categoryId, size = 16, className = '' }) => {
  const config = TOPIC_ICON_MAP[categoryId] || {
    icon: FaBrain,
    color: '#3fb950',
    bg: 'rgba(63, 185, 80, 0.12)',
    border: 'rgba(63, 185, 80, 0.3)',
  };

  const IconComponent = config.icon;

  return (
    <div
      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-all ${className}`}
      style={{
        backgroundColor: config.bg,
        borderColor: config.border,
        color: config.color,
      }}
    >
      <IconComponent size={size} />
    </div>
  );
};

export default TopicIcon;

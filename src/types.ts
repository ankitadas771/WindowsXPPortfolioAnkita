import React from 'react';

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SkillItem {
  name: string;
  logoUrl?: string;
  svgIcon?: React.ReactNode;
  level: string; // e.g., Expert, Advanced, Intermediate
  category: 'Front-end' | 'Design & UI/UX' | 'Mobile' | 'Language';
  bgColor: string;
  color: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  category: string;
  features: string[];
}

export interface EducationItem {
  degree: string;
  school: string;
  duration: string;
  grade?: string;
  description: string;
  icon: string;
}

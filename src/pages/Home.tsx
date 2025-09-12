import {
    ArrowRight,
    ExternalLink,
    Code,
    Palette,
    Globe,
    Database,
} from "lucide-react";
import { memo } from 'react';
import type { Skill, Experience, Education } from '../types';

const skills: Skill[] = [
    {
        name: "Next.js",
        category: "Frontend",
        level: 9,
        icon: "⚛️",
    },
    {
        name: "React",
        category: "Frontend",
        level: 9,
        icon: "⚛️",
    },
    {
        name: "TypeScript",
        category: "Language",
        level: 8,
        icon: "📘",
    },
    {
        name: "Node.js",
        category: "Backend",
        level: 8,
        icon: "💚",
    },
    {
        name: "Express.js",
        category: "Backend",
        level: 8,
        icon: "🚂",
    },
    {
        name: "MongoDB",
        category: "Database",
        level: 7,
        icon: "🍃",
    },
    {
        name: "Electron.js",
        category: "Desktop",
        level: 7,
        icon: "⚡",
    },
    {
        name: "Tailwind CSS",
        category: "Styling",
        level: 9,
        icon: "🎨",
    },
];

const experiences: Experience[] = [
    {
        title: "Support Coordinator",
        company: "Ericsson",
        duration: "2024 - Present",
        description:
            "Working as a Support Coordinator assisting clients with technical issues and ensuring smooth project delivery.",
        technologies: ["React", "TypeScript", "Node.js", "MongoDB"],
    },
];

const education: Education[] = [
    {
        degree: "Computer Engineering",
        school: "Eastern Mediterranean University",
        duration: "2020 - 2024",
        description:
            "Graduated from Department of Computer Engineering with focus on software development and algorithms.",
    },
];

// Memoized subcomponents for better performance
const SkillCard = memo(({ skill, index }: { skill: Skill; index: number }) => (
    <div className="card hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center mb-4">
            <span className="text-2xl mr-3" role="img" aria-label={skill.name}>
                {skill.icon}
            </span>
            <div>
                <h3 className="font-semibold text-white dark:text-white">
                    {skill.name}
                </h3>
                <p className="text-sm text-gray-300 dark:text-gray-300">
                    {skill.category}
                </p>
            </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
            <div
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-1000 ease-out"
                style={{
                    width: `${skill.level * 10}%`,
                    animationDelay: `${index * 100}ms`,
                }}
            />
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-400 mt-2 text-right">
            {skill.level}/10
        </p>
    </div>
));

SkillCard.displayName = 'SkillCard';

const ExperienceCard = memo(({ experience }: { experience: Experience }) => (
    <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
            <h4 className="text-lg font-semibold text-white dark:text-white">
                {experience.title}
            </h4>
            <span className="text-sm text-primary-600 font-medium">
                {experience.duration}
            </span>
        </div>
        <p className="text-primary-600 font-medium mb-3">
            {experience.company}
        </p>
        <p className="text-gray-300 dark:text-gray-300 mb-4">
            {experience.description}
        </p>
        <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
                <span
                    key={tech}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                >
                    {tech}
                </span>
            ))}
        </div>
    </div>
));

ExperienceCard.displayName = 'ExperienceCard';

const EducationCard = memo(({ education }: { education: Education }) => (
    <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
            <h4 className="text-lg font-semibold text-white dark:text-white">
                {education.degree}
            </h4>
            <span className="text-sm text-purple-600 font-medium">
                {education.duration}
            </span>
        </div>
        <p className="text-purple-600 font-medium mb-3">
            {education.school}
        </p>
        <p className="text-gray-300 dark:text-gray-300">
            {education.description}
        </p>
    </div>
));

EducationCard.displayName = 'EducationCard';

export const Home = memo(() => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-fade-in-up">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white dark:text-white mb-6">
                                Hi, I'm{" "}
                                <span className="gradient-text">
                                    Halil Yüksel
                                </span>
                            </h1>
                            <p className="text-xl text-gray-300 dark:text-gray-300 mb-8 leading-relaxed">
                                Software Engineer | Full Stack Developer
                            </p>
                            <p className="text-lg text-gray-300 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed">
                                I'm a software engineer and full stack web
                                developer from Turkey with a passion for
                                building performant, user-friendly, and scalable
                                web applications. I've graduated from Eastern
                                Mediterranean University, Department of Computer
                                Engineering. Currently, working as a Support
                                Coordinator at Ericsson.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="/contact"
                                    className="btn-primary inline-flex items-center justify-center"
                                >
                                    Get In Touch
                                    <ArrowRight size={20} className="ml-2" />
                                </a>
                                <a
                                    href="/blog"
                                    className="btn-outline inline-flex items-center justify-center"
                                >
                                    Read My Blog
                                    <ExternalLink size={20} className="ml-2" />
                                </a>
                            </div>
                        </div>
                        <div className="relative animate-fade-in">
                            <div className="w-80 h-80 mx-auto bg-gradient-to-br from-primary-400 to-purple-500 rounded-full shadow-2xl flex items-center justify-center">
                                <img
                                    src="/profile.jpg"
                                    alt="Halil Yüksel"
                                    className="w-72 h-72 rounded-full object-cover border-4 border-white shadow-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="section-padding bg-gray-900 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white dark:text-white mb-4">
                            About Me
                        </h2>
                        <p className="text-xl text-gray-300 dark:text-gray-300 max-w-3xl mx-auto">
                            My philosophy and approach to software development
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-white dark:text-white mb-6">
                                My Philosophy
                            </h3>
                            <p className="text-gray-300 dark:text-gray-300 mb-6 leading-relaxed">
                                I believe that technology should always move
                                forward—and so should developers. That's why I
                                focus on modern tools and frameworks, not just
                                for the sake of keeping up, but because they
                                open the door to building smarter, faster, and
                                more impactful solutions.
                            </p>
                            <p className="text-gray-300 dark:text-gray-300 leading-relaxed">
                                For me, real growth comes from real projects. I
                                like getting my hands dirty with challenges that
                                exist outside of theory things that people
                                actually use. Whether it's improving
                                performance, designing user-friendly interfaces,
                                or tackling complex problems head-on, my goal is
                                always the same: to create work that makes a
                                difference in everyday life.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="card text-center">
                                <Code className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                                <h4 className="font-semibold text-white dark:text-white mb-2">
                                    Clean Code
                                </h4>
                                <p className="text-sm text-gray-300 dark:text-gray-300">
                                    Writing maintainable and scalable code
                                </p>
                            </div>
                            <div className="card text-center">
                                <Palette className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                                <h4 className="font-semibold text-white dark:text-white mb-2">
                                    UI/UX Focus
                                </h4>
                                <p className="text-sm text-gray-300 dark:text-gray-300">
                                    Designing beautiful user experiences
                                </p>
                            </div>
                            <div className="card text-center">
                                <Globe className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                                <h4 className="font-semibold text-white dark:text-white mb-2">
                                    Modern Web
                                </h4>
                                <p className="text-sm text-gray-300 dark:text-gray-300">
                                    Using cutting-edge technologies
                                </p>
                            </div>
                            <div className="card text-center">
                                <Database className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                                <h4 className="font-semibold text-white dark:text-white mb-2">
                                    Full Stack
                                </h4>
                                <p className="text-sm text-gray-300 dark:text-gray-300">
                                    End-to-end application development
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="section-padding bg-gray-800 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white dark:text-white mb-4">
                            Skills & Technologies
                        </h2>
                        <p className="text-xl text-gray-300 dark:text-gray-300 max-w-3xl mx-auto">
                            Technologies I work with to bring ideas to life
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {skills.map((skill, index) => (
                            <SkillCard key={skill.name} skill={skill} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="section-padding bg-gray-900 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white dark:text-white mb-4">
                            Experience
                        </h2>
                        <p className="text-xl text-gray-300 dark:text-gray-300 max-w-3xl mx-auto">
                            My professional journey and key experiences
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Experience */}
                        <div>
                            <h3 className="text-2xl font-bold text-white dark:text-white mb-6 flex items-center">
                                <div className="w-2 h-8 bg-primary-600 rounded-full mr-4"></div>
                                Work Experience
                            </h3>
                            <div className="space-y-6">
                                {experiences.map((exp) => (
                                    <ExperienceCard 
                                        key={`${exp.company}-${exp.title}`} 
                                        experience={exp} 
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Education */}
                        <div>
                            <h3 className="text-2xl font-bold text-white dark:text-white mb-6 flex items-center">
                                <div className="w-2 h-8 bg-purple-600 rounded-full mr-4"></div>
                                Education
                            </h3>
                            <div className="space-y-6">
                                {education.map((edu) => (
                                    <EducationCard 
                                        key={`${edu.school}-${edu.degree}`} 
                                        education={edu} 
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-gradient-to-br from-primary-600 to-purple-700">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                        Let's Work Together
                    </h2>
                    <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                        I'm always interested in new opportunities and exciting
                        projects. Let's create something amazing together!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 inline-flex items-center justify-center"
                        >
                            Start a Conversation
                            <ArrowRight size={20} className="ml-2" />
                        </a>
                        <a
                            href="/blog"
                            className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-all duration-200 inline-flex items-center justify-center"
                        >
                            Read My Thoughts
                            <ExternalLink size={20} className="ml-2" />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
});

Home.displayName = 'Home';

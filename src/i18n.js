import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            //Landing Page
            "go-to-app": "Go to App",
            "login": "Log in",
            "signup": "Sign up",
            "landing-header": "Figma file to live site in a few clicks",
            "landing-subheader": "You can publish an interactive website or portfolio directly from your Figma, no coding necessary.",
            "start-for-free": "Start for free",
            "guide": "guide",
            "design-in-figma": "Design in Figma",
            "instruc-one": "Skip learning other tools or coding. Bring your entire website or portfolio to life right in Figma. Leverage its features like transitions, GIFs and video to make it interactive and engaging.",
            "simple-setup": "Simple setup",
            "instruc-two": "Sign up and paste in your Figma prototype links for both desktop and mobile views - this ensures your site works for anyone visiting. Preview the site to see your fantastic Figma designs brought to life.",
            "go-live": "Go live!",
            "instruc-three": "Publish your site instantly to start securing jobs and clients faster. Updates made in Figma are reflected on your site instantly. Presetize your site with a personalised domain name.",
            "pick-a-plan": "Pick a plan to suit your needs",
            "all-plans-are": "All plans are available with full functionality, please choose the right plan according to your needs",
            "free": "Free",
            "monthly": "Monthly",
            "yearly": "Yearly",
            "year": "year",
            "no-bills": "No bills!",
            "free-feat-one": "1 project/websites",
            "free-feat-two": "Free Figmafolio domain",
            "removes-made-with": "Removes \'Made with Figmafolio\' label",
            "monthly-feat-one": "5 projects/websites",
            "monthly-yearly-feat-two": "Use custom domains",
            "monthly-yearly-feat-three": "Priority technical and product support",
            "yearly-feat-one": "Unlimited projects/websites",
            "try-for-free": "Try for free",
            "get-started": "Get started",
            "terms-and-conditions": "Terms and Conditions",
            "privacy-policy": "Privacy Policy",
            //Authentication
            "welcome-to-figmafolio": "Welcome to Figmafolio",
            "glad-your-back": "Glad you're back!",
            "time-to-get-creating": "Time to get creating.",
            "youre-almost-there": "You're almost there!",
            "sign-up-to-showcase-your-designs": "Sign up to showcase your designs.",
            "email": "Email",
            "password": "Password",
            "enter-your-email": "Enter your email",
            "enter-your-password": "Enter your password",
            "forgot-password": "Forgot password",
            "email-address": "Email address",
            "name": "Name",
            "verify-password": "Verify password",
            "continue": "Continue",
            "new-site": "+ New site",
            "your-library": "Your Library",
            "draft": "Draft",
            "published": "Published",
            "update": "Update",
            "delete": "Delete",
            "current-plan": "Current plan",
            "upgrade-plan": "Upgrade plan",
            "back-to-your-library": "Back to your library",
            //Dropdown
            "profile": "Profile",
            "billing": "Billing",
            "logout": "Logout",
            //===========FORM============
            "general": "General",
            "title": "Title",
            "your-domain": "Your domain",
            "custom-domain": "Custom domain",
            "this-will-be-assigned": "This will be assigned after clicking ‘Publish’.",
            //UPGRADE ACCOUNT BUTTON
            "you-have-to-upgrade": "You have to upgrade account to have Custom domain",
            "upgrade-account": "Upgrade account",

            "custom-domain-instruct": "To use a custom domain name, add new DNS records in your domain registrar's DNS manager. Add the following records:",
            "custom-domain-instruct2": "Make sure you add an entry for both @ and www.",
            "type": "Type",
            "value": "Value",
            "enter-your-site-name": "Enter your site name",
            "enter-your-domain": "Enter your domain",
            "figma-prototype-links": "Figma prototype links",
            "desktop-prototype-link": "Desktop prototype link",
            "mobile-prototype-link": "Mobile prototype link",
            "custom-desktop-url": "Custom Desktop Url",
            "custom-mobile-url": "Custom Mobile Url",
            "preview": "Preview",
            "need-help-setting": "Need help setting up your site?",
            //Instruction in form
            "instruct-one": "Design in Figma",
            "instruct-one-one": "1. Open Figma and design each page of your portfolio or website",
            "instruct-one-note": "Note: It is recommended to create separate designs for both desktop and mobile pages.",
            "instruct-two": "Prototype in Figma",
            "instruct-two-one": "1. Switch to Prototype mode in the right sidebar.",
            "instruct-two-two": "2. Draw connections between pages to define the navigation of your site.",
            "instruct-two-three": "3. Ideally create two flows: one for desktop and one for mobile.",
            "instruct-two-note": "Note: You can add animations to connections to enhance any transitions.",
            "instruct-three": "Set flow starting points",
            "instruct-three-one": "1. For your desktop prototype, select the frame users will see. Typically the homepage.",
            "instruct-three-two": "2. In the right sidebar under Prototype, click the ‘+’ next to ‘Flow starting point’ to set the flow starting point.",
            "instruct-three-three": "3. Repeat for your mobile prototype if you have one.",
            "instruct-four": "Input your prototype links",
            "instruct-four-one": "1. Click the canvas in Figma to get file properties in the right sidebar.",
            "instruct-four-two": "2. Select ‘Prototype’. Under ‘Flows’ .hover over each flow and \"Copy link\" to get the prototype links.",
            "instruct-four-three": "3. Paste in the corresponding prototype links below.",
            "instruct-four-four": "4. Click \"Preview\" to view and publish your portfolio/site.",
            "instruct-four-note": "Note: If you only provide one prototype link, Figmafolio will show that flow on both desktop and mobile.",
            //PREVIEW PAGE
            "save-as-draft": "Save as Draft",
            "update": "Update",
            "desktop": "Desktop",
            "mobile": "Mobile",
            "publish": "Publish",
            "back-to-dashboard": "< Back to dashboard",
            "preview": "Preview",
            //Profile Page
            "personal-information": "Personal Information",
            "security": "Security",
            "change-password": "Change password",
            //Billing Page
            "billing": "Billing",
            "change-plan": "Change plan",
            "cancel-plan": "Cancel plan",
            "monthly-plan": "Monthly Plan",
            "yearly-plan": "Yearly Plan",
            "billed-monthly-at": "Billed monthly at $5 USD",
            "billed-yearly-at": "Billed as one payment of $48 USD",
        },
    },
    // ... other languages (e.g., fr, es)
};

i18n
    .use(initReactI18next) // Initializes i18next with react-i18next
    .init({
        resources,
        lng: 'en', // Set the default language
        fallbackLng: 'en', // Fallback language if translations are missing
        interpolation: {
            escapeValue: false, // Prevent escaping special characters in translations
        },
    });

export default i18n;
import { format } from "date-fns";

const cannedReplies = [
    "Interesting! Tell me more.",
    "Why do you think that?",
    "That sounds great!",
    "I'm not sure I understand—could you clarify?",
    "Haha, that's funny!",
];

const jokes = [
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "What do you call fake spaghetti? An impasta!",
    "Why don't scientists trust atoms? Because they make up everything!",
    "I would tell you a UDP joke, but you might not get it.",
];

export default {
    getReply(userMessage: string): string {
        const text = userMessage.trim();
        const lower = text.toLowerCase();

        // Greetings with time of day
        if (/\b(hi|hello|hey)\b/.test(lower)) {
            const hour = new Date().getHours();
            let timeGreeting = "Hello";
            if (hour < 12) timeGreeting = "Good morning";
            else if (hour < 18) timeGreeting = "Good afternoon";
            else timeGreeting = "Good evening";
            return `${timeGreeting}! How can I help you today?`;
        }

        // Farewells
        if (/\b(bye|goodbye|see you|later)\b/.test(lower)) {
            return "Goodbye! It was nice chatting with you.";
        }

        // How are you
        if (/how are you\?*$/.test(lower)) {
            return "I'm just a bot, but I'm doing great! How about you?";
        }

        // Question detection
        if (lower.endsWith("?")) {
            return "That's a great question—what do you think?";
        }

        // Likes
        const likeMatch = lower.match(/i (?:like|love) (.+)/);
        if (likeMatch) {
            return `What do you like most about ${likeMatch[1]}?`;
        }

        // Feelings
        const feelingMatch = lower.match(/i am (feeling )?(happy|sad|angry|excited|tired|bored)/);
        if (feelingMatch) {
            return `Why do you feel ${feelingMatch[2]}?`;
        }

        // Thank you / You're welcome
        if (/\b(thank you|thanks)\b/.test(lower)) {
            return "You're welcome! Anything else on your mind?";
        }

        // Joke request
        if (lower.includes("joke")) {
            const idx = Math.floor(Math.random() * jokes.length);
            return jokes[idx];
        }

        // Ask for time
        if (/\b(time)\b/.test(lower)) {
            const now = new Date();
            const formatted = format(now, "hh:mm a");
            return `The current time is ${formatted}.`;
        }

        // Tell me about X
        const aboutMatch = lower.match(/tell me about (.+)/);
        if (aboutMatch) {
            return `I don't have a lot of info on ${aboutMatch[1]}, but I'd love to learn more!`;
        }

        // Weather small talk
        if (lower.includes("weather")) {
            return "I'm not sure about the weather, but I hope it's nice where you are!";
        }

        // Fallback: echo back with prompt
        const idx = Math.floor(Math.random() * cannedReplies.length);
        return `${cannedReplies[idx]} You said: "${text}".`;
    },
};


const cannedReplies = [
    "Interesting! Tell me more.",
    "Why do you think that?",
    "That sounds great!",
    "I'm not sure I understand—could you clarify?",
    "Haha, that's funny!",
];

export default {
    getReply(userMessage: string): string {
        // Simple random reply
        const idx = Math.floor(Math.random() * cannedReplies.length);
        return cannedReplies[idx];
    },
};


export default interface Message {
    message: string,
    fromUser: boolean,
    image?: any;
}

export const MessageData: Message[] = [
    { message: "Hi there I am your AI friend 👋", fromUser: false, image: 'https://i.ibb.co/NmvnV7D/wysa-Image.jpg' },
    { message: "I'm here to understand your concerns and connect you with the best resources available to support you.", fromUser: false, image: '' },
    { message: "How can I help You?", fromUser: false, image: '' }
];
export type ChatMessageAPIType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}
export type StatusType = 'pending' | 'ready' | 'error'
type MessageReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void;
type StatusChangedSubscriberType = (status: StatusType) => void;
type EventName = 'message-received' | 'status-changed';

let subscribers = {
    'message-received':  [] as MessageReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
};

let ws: WebSocket | null = null;

const closeHandler = () => {
    setTimeout(createChannel, 3000);
    notifySubscribersAboutStatus('pending')
}

const messageHandler =(e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    subscribers['message-received'].forEach(s => s(newMessages))
}

const openHandler = () => {
    notifySubscribersAboutStatus('ready');
}

const errorHandler = () => {
    notifySubscribersAboutStatus('error');
    console.log('Restart rage');
    
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler);
    ws?.removeEventListener('message', messageHandler);
    ws?.removeEventListener('open', openHandler);
    ws?.removeEventListener('error', errorHandler);
}
const notifySubscribersAboutStatus = (status: StatusType) => {  // уведомление подписчика об изменение статуса
    subscribers['status-changed'].forEach(s => s(status));
}

function createChannel(){
            
    cleanUp()
    ws?.close();
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    notifySubscribersAboutStatus('pending');
    ws.addEventListener('close', closeHandler);
    ws.addEventListener('message', messageHandler);
    ws.addEventListener('open', openHandler);
    ws.addEventListener('error', errorHandler);
}


export const chatAPI = {
    start(){
        createChannel()
    },
    stop(){
        subscribers['message-received'] = [];
        subscribers['status-changed'] = [];
        cleanUp();
        ws?.close();
    },
    subscride(eventName: EventName, callback: MessageReceivedSubscriberType | StatusChangedSubscriberType){
        //@ts-ignore
        subscribers[eventName].push(callback);
        

        // отписка
        // return () => {
        //     subscribers[eventName] = subscribers.filter(s => s !== callback)
        // }
    },

    unsubscribe(eventName: EventName, callback: MessageReceivedSubscriberType | StatusChangedSubscriberType) {
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },

    sendMessage(message: string){
        ws?.send(message)
    }
}


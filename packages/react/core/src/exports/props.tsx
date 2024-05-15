import {ConversationOptions, EventsMap, LayoutOptions, PromptBoxOptions, StandardChatAdapter} from '@nlux/core';
import {ChatAdapter} from '../../../../shared/src/types/adapters/chat/chatAdapter';
import {ChatAdapterBuilder} from '../../../../shared/src/types/adapters/chat/chatAdapterBuilder';
import {ChatItem} from '../../../../shared/src/types/conversation';
import {MessageOptions} from './messageOptions';
import {PersonaOptions} from './personaOptions';

/**
 * Props for the AiChat React component.
 */
export type AiChatProps<AiMsg> = {
    /**
     * The chat adapter to use. This is required and essential for the component to work.
     * You can either provide a standard adapter from @nlux or create a custom adapter.
     * For more information, please visit — https://nlux.dev/learn/adapters
     */
    adapter: ChatAdapter<AiMsg> | StandardChatAdapter<AiMsg> | ChatAdapterBuilder<AiMsg>;

    /**
     * A map of event handlers.
     */
    events?: Partial<EventsMap<AiMsg>>;

    /**
     * The class name to add to the root element of the component.
     */
    className?: string;

    /**
     * The theme ID to use.
     * This should be the ID of a theme that has been loaded into the page.
     */
    themeId?: string;

    /**
     * The initial conversation history to display.
     */
    initialConversation?: ChatItem<AiMsg>[];

    /**
     * Layout options.
     */
    layoutOptions?: LayoutOptions;

    /**
     * Options for the conversation.
     */
    conversationOptions?: ConversationOptions;

    /**
     * Options related to a single message in the conversation.
     */
    messageOptions?: MessageOptions<AiMsg>;

    /**
     * Options for the prompt box.
     */
    promptBoxOptions?: PromptBoxOptions;

    /**
     * Options for the persona.
     */
    personaOptions?: PersonaOptions;
};

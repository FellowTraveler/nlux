import {ChatAdapterExtras, StreamingAdapterObserver} from '@nlux/core';
import {NluxUsageError} from '@shared/types/error';
import {warn} from '@shared/utils/warn';
import OpenAI from 'openai';
import {adapterErrorToExceptionId} from '../../../utils/adapterErrorToExceptionId';
import {conversationHistoryToMessagesList} from '../../../utils/conversationHistoryToMessagesList';
import {ChatAdapterOptions} from '../types/chatAdapterOptions';
import {OpenAiAbstractAdapter} from './adapter';

export class OpenAiBatchAdapter<AiMsg> extends OpenAiAbstractAdapter<AiMsg> {
    constructor({
        apiKey,
        model,
        systemMessage,
    }: ChatAdapterOptions) {
        super({
            apiKey,
            model,
            systemMessage,
            dataTransferMode: 'batch',
        });

        if (systemMessage !== undefined && systemMessage.length > 0) {
            this.systemMessage = systemMessage;
        }
    }

    async batchText(message: string, extras: ChatAdapterExtras<AiMsg>): Promise<string | object | undefined> {
        const messagesToSend: Array<
            OpenAI.Chat.Completions.ChatCompletionSystemMessageParam |
            OpenAI.Chat.Completions.ChatCompletionUserMessageParam |
            OpenAI.Chat.Completions.ChatCompletionAssistantMessageParam
        > = this.systemMessage ? [
            {
                role: 'system',
                content: this.systemMessage,
            },
        ] : [];

        if (extras.conversationHistory) {
            const itemsInOpenAiFormat = conversationHistoryToMessagesList<AiMsg>(extras.conversationHistory);
            messagesToSend.push(...itemsInOpenAiFormat);
        }

        messagesToSend.push({
            role: 'user',
            content: message,
        });

        try {
            return await this.openai.chat.completions.create({
                stream: false,
                model: this.model,
                messages: messagesToSend,
            });
        } catch (error) {
            warn('Error while making API call to OpenAI');
            warn(error);

            const message = (error as Error | undefined)?.message;
            throw new NluxUsageError({
                source: this.constructor.name,
                message: message ?? 'Error while making API call to OpenAI',
                exceptionId: adapterErrorToExceptionId(error) ?? undefined,
            });
        }
    }

    streamText(message: string, observer: StreamingAdapterObserver, extras: ChatAdapterExtras<AiMsg>): void {
        throw new NluxUsageError({
            source: this.constructor.name,
            message: 'Cannot stream text from the batch adapter!',
        });
    }
}

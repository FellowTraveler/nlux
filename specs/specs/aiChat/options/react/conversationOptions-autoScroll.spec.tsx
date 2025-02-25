import {AiChat} from '@nlux-dev/react/src';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {adapterBuilder} from '../../../../utils/adapterBuilder';
import {AdapterController} from '../../../../utils/adapters';
import {waitForMdStreamToComplete, waitForReactRenderCycle} from '../../../../utils/wait';

describe('<AiChat /> + conversationOptions + autoScroll', () => {
    let adapterController: AdapterController | undefined;

    beforeEach(() => {
        adapterController = adapterBuilder()
            .withBatchText(false)
            .withStreamText(true)
            .create();
    });

    afterEach(() => {
        adapterController = undefined;
    });

    describe('When the user adds a message to an AiChat without autoScroll config', () => {
        it('Should scroll to the bottom when the message starts streaming', async () => {
            // Arrange
            const aiChat = <AiChat adapter={adapterController!.adapter}/>;
            const {container} = render(aiChat);
            await waitForReactRenderCycle();
            const textArea: HTMLTextAreaElement = container.querySelector('.nlux-comp-composer > textarea')!;
            const conversationContainer: any = container.querySelector('.nlux-conversation-container')!;
            conversationContainer.scrollTo = vi.fn();

            // Act
            await userEvent.type(textArea, 'Hello{enter}');
            await waitForReactRenderCycle();
            await waitForMdStreamToComplete();

            // Assert
            expect(conversationContainer?.scrollTo).toHaveBeenCalledWith({behavior: 'instant', top: 50000});
        });

        describe('When a message is being streamed', () => {
            it('Should scroll to the bottom when the message is streamed', async () => {
                // Arrange
                const aiChat = <AiChat adapter={adapterController!.adapter}/>;
                const {container} = render(aiChat);
                await waitForReactRenderCycle();
                const textArea: HTMLTextAreaElement = container.querySelector('.nlux-comp-composer > textarea')!;
                const conversationContainer: any = container.querySelector('.nlux-conversation-container')!;
                conversationContainer.scrollTo = vi.fn();

                // Act
                await userEvent.type(textArea, 'Hello{enter}');
                await waitForReactRenderCycle();
                await waitForMdStreamToComplete();

                // Assert
                expect(conversationContainer?.scrollTo).toHaveBeenCalledWith({behavior: 'instant', top: 50000});
            });
        });
    });

    describe('When autoScroll is set to false', () => {
        it('Should not scroll to the bottom when the message starts streaming', async () => {
            // Arrange
            const aiChat = <AiChat
                adapter={adapterController!.adapter}
                conversationOptions={{autoScroll: false}}
            />;
            const {container} = render(aiChat);
            await waitForReactRenderCycle();
            const textArea: HTMLTextAreaElement = container.querySelector('.nlux-comp-composer > textarea')!;
            const conversationContainer: any = container.querySelector('.nlux-conversation-container')!;
            conversationContainer.scrollTo = vi.fn();

            // Act
            await userEvent.type(textArea, 'Hello{enter}');
            await waitForReactRenderCycle();
            await waitForMdStreamToComplete();

            // Assert
            expect(conversationContainer?.scrollTo).not.toHaveBeenCalled();
        });

        describe('When a message is being streamed', () => {
            it('Should not scroll to the bottom when the message is being streamed', async () => {
                // Arrange
                const aiChat = <AiChat
                    adapter={adapterController!.adapter}
                    conversationOptions={{autoScroll: false}}
                />;
                const {container} = render(aiChat);
                await waitForReactRenderCycle();
                const textArea: HTMLTextAreaElement = container.querySelector('.nlux-comp-composer > textarea')!;
                const conversationContainer: any = container.querySelector('.nlux-conversation-container')!;
                conversationContainer.scrollTo = vi.fn();

                // Act
                await userEvent.type(textArea, 'Hello{enter}');
                await waitForReactRenderCycle();
                await waitForMdStreamToComplete();

                // Assert
                expect(conversationContainer?.scrollTo).not.toHaveBeenCalled();
            });
        });
    });
});

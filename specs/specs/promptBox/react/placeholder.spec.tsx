import {AiChat, PromptBoxOptions} from '@nlux-dev/react/src';
import {render} from '@testing-library/react';
import {afterEach, beforeEach, describe, expect, it} from 'vitest';
import {adapterBuilder} from '../../../utils/adapterBuilder';
import {AdapterController} from '../../../utils/adapters';

describe('<AiChat /> + promptBox + placeholder', () => {
    let adapterController: AdapterController | undefined;

    beforeEach(() => {
        adapterController = adapterBuilder().withFetchText().create();
    });

    afterEach(() => {
        adapterController = undefined;
    });

    describe('When no placeholder option is initially provided', () => {
        it('The promptBox should be rendered without a placeholder', async () => {
            // Arrange
            const {container} = render(<AiChat adapter={adapterController!.adapter}/>);

            // Act
            const textArea: HTMLTextAreaElement = container.querySelector('.nlux-comp-prmptBox > textarea')!;

            // Assert
            expect(textArea.placeholder).toBe('');
        });

        describe('When a placeholder option is added', () => {
            it('The promptBox should be rendered with a placeholder', async () => {
                // Arrange
                const {container, rerender} = render(<AiChat adapter={adapterController!.adapter}/>);

                // Act
                rerender(<AiChat
                    adapter={adapterController!.adapter}
                    promptBoxOptions={{placeholder: 'My prompt-box'}}
                />);
                const textArea: HTMLTextAreaElement = container.querySelector('.nlux-comp-prmptBox > textarea')!;

                // Assert
                expect(textArea.placeholder).toBe('My prompt-box');
            });
        });
    });

    describe('When the component is created with placeholder option', () => {
        it('The promptBox should be rendered with a placeholder', async () => {
            // Arrange
            const promptBoxOptions: PromptBoxOptions = {placeholder: 'My prompt-box'};
            const {container} = render(
                <AiChat adapter={adapterController!.adapter} promptBoxOptions={promptBoxOptions}/>,
            );

            // Act
            const textArea: HTMLTextAreaElement = container.querySelector('.nlux-comp-prmptBox > textarea')!;

            // Assert
            expect(textArea.placeholder).toBe('My prompt-box');
        });
    });
});

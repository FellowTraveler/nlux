import {describe, expect, it} from 'vitest';
import {createComposerDom} from '@shared/components/Composer/create';

describe('When a composer component is rendered and is in waiting status', () => {
    it('Should render the composer with a submit button', () => {
        // Arrange
        const dom = createComposerDom({status: 'waiting'});

        // Act
        const html = dom.outerHTML;

        // Assert
        expect(html).toEqual(
            expect.stringContaining('<div class="nlux-comp-composer nlux-composer--waiting">'),
        );
        expect(html).toEqual(
            expect.stringContaining('<button disabled=""><div class="nlux-comp-sendIcon"><div class="nlux-comp-sendIcon-container">'));
    });

    it('the submit button should be disabled', () => {
        // Arrange
        const dom = createComposerDom({status: 'waiting'});
        const submitButton = dom.querySelector('button')!;

        // Act
        const html = dom.outerHTML;

        // Assert
        expect(submitButton.disabled).toBe(true);
    });

    it('The textarea should be enabled', () => {
        // Arrange
        const dom = createComposerDom({status: 'waiting'});
        const textarea = dom.querySelector('textarea')!;

        // Act
        const html = dom.outerHTML;

        // Assert
        expect(textarea.disabled).toBe(false);
    });

    describe('When the status is updated to typing', () => {
        it('Should render the composer with a text input', () => {
            // Arrange
            const dom = createComposerDom({status: 'waiting'});
            const textarea = dom.querySelector('textarea')!;

            // Act
            const html = dom.outerHTML;

            // Assert
            expect(html).toEqual(expect.stringContaining('<textarea placeholder=""></textarea>'));
        });

        it('The textarea should be enabled', () => {
            // Arrange
            const dom = createComposerDom({status: 'waiting'});
            const textarea = dom.querySelector('textarea')!;

            // Act
            const html = dom.outerHTML;

            // Assert
            expect(textarea.disabled).toBe(false);
        });
    });
});

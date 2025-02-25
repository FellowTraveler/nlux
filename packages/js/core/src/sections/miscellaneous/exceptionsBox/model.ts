import {NLErrorId} from '@shared/types/exceptions/errors';
import {BaseComp} from '../../../aiChat/comp/base';
import {Model} from '../../../aiChat/comp/decorators';
import {ControllerContext} from '../../../types/controllerContext';
import {renderExceptionsBox} from './render';
import {
    CompExceptionsBoxActions,
    CompExceptionsBoxElements,
    CompExceptionsBoxEvents,
    CompExceptionsBoxProps,
} from './types';
import {updateExceptionsBox} from './update';

@Model('exceptionsBox', renderExceptionsBox, updateExceptionsBox)
export class CompExceptionsBox<AiMsg> extends BaseComp<
    AiMsg,
    CompExceptionsBoxProps,
    CompExceptionsBoxElements,
    CompExceptionsBoxEvents,
    CompExceptionsBoxActions
> {
    constructor(
        context: ControllerContext<AiMsg>,
        props: CompExceptionsBoxProps,
    ) {
        super(context, props);
    }

    public destroy() {
        super.destroy();
    }

    public showAlert(type: NLErrorId, message: string) {
        this.executeDomAction('displayException', message);
    }
}

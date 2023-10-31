import getPageLayoutMetadata from '@salesforce/apex/PageLayoutRecordDisplayController.getPageLayoutMetadata';
import { LightningElement, api, wire } from 'lwc';

export default class LwcLayoutRecordDisplay extends LightningElement {
    @api recordId;
    @api objectApiName;
    @api pageLayoutName = 'Event__c-Event Layout';

    // private properties
    sections;
    errors;
    buttonClicked;

    get iconName() {
        return this.buttonClicked ? 'utility:chevronright' : 'utility:chevrondown';
    }

    handleSectionHeaderClick(event) {
        let collapsibleSectionContainer = event.target.parentNode.parentNode;
        collapsibleSectionContainer.classList.toggle("slds-is-open");
        this.buttonClicked = !this.buttonClicked;
    }


    @wire(getPageLayoutMetadata, { pageLayoutName: '$pageLayoutName' })
    wiredPageLayout({ data, error }) {
        if (data) {
            this.sections = data.Sections;
            this.error = undefined;

            console.log('data', this.sections);
        }
        else if (error) {
            this.error = error;
            this.sections = undefined;
            console.log('error', JSON.stringify(error));
        }
    }

}
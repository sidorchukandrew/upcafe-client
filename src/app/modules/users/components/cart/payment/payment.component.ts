import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { OrderService } from 'src/app/services/order.service';
import { OrderConfirmation } from 'src/app/models/OrderConfirmation';
import { Subscription } from 'rxjs';

declare var SqPaymentForm: any; //magic to allow us to access the SquarePaymentForm lib

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {

  paymentForm; //this is our payment form object
  totalPrice: number;
  orderConfirmation: OrderConfirmation;
  subscriptions: Subscription;

  constructor(private navbarService: NavbarService, private orderService: OrderService) { }

  ngOnInit() {
    this.navbarService.menuBarHidden = true;
    this.orderService.getConfirmation().subscribe(confirmation => {
      this.orderConfirmation = confirmation;
    });

    var applicationId = "sandbox-sq0idb-S7VRotepCHWB8XgYxKZIsQ";
    var locationId = "P80ND85DPV3BR";
    this.paymentForm = new SqPaymentForm({
      // Initialize the payment form elements

      //TODO: Replace with your sandbox application ID
      applicationId: applicationId,
      locationId: locationId,
      inputClass: 'sq-input',
      autoBuild: false,

      // Customize the CSS for SqPaymentForm iframe elements
      inputStyles: [{
        fontSize: '16px',
        lineHeight: '24px',
        padding: '16px',
        placeholderColor: '#a0a0a0',
        backgroundColor: 'transparent',
      }],
      // Initialize the credit card placeholders
      cardNumber: {
        elementId: 'sq-card-number',
        placeholder: 'Card Number'
      },
      cvv: {
        elementId: 'sq-cvv',
        placeholder: 'CVV'
      },
      expirationDate: {
        elementId: 'sq-expiration-date',
        placeholder: 'MM/YY'
      },
      postalCode: {
        elementId: 'sq-postal-code',
        placeholder: 'Postal'
      },
      // SqPaymentForm callback functions
      callbacks: {
        /*
        * callback function: cardNonceResponseReceived
        * Triggered when: SqPaymentForm completes a card nonce request
        */
        cardNonceResponseReceived: function (errors, nonce, cardData) {
          if (errors) {
            // Log errors from nonce generation to the browser developer console.
            console.error('Encountered errors:');
            errors.forEach(function (error) {
              console.error('  ' + error.message);
            });
            alert('Encountered errors, check browser developer console for more details');
            return;
          }

          (<HTMLInputElement>document.getElementById('card-nonce')).value = nonce;
          (<HTMLInputElement>document.getElementById('card-nonce')).select();
        }
      }
    });

    this.paymentForm.build();
  }

  requestCardNonce(event) {

    // Don't submit the form until SqPaymentForm returns with a nonce
    event.preventDefault();

    // Request a nonce from the SqPaymentForm object
    this.paymentForm.requestCardNonce();
  }

  nonceReceived(value) {
    this.orderService.postPayment(value, this.orderConfirmation.id, this.orderConfirmation.totalPrice).subscribe(data => console.log(data));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}


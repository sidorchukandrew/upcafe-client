import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';

declare var SqPaymentForm: any; //magic to allow us to access the SquarePaymentForm lib
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentForm; //this is our payment form object

  constructor(private navbarService: NavbarService) { }

  ngOnInit() {
    this.navbarService.menuBarHidden = true;
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
        backgroundColor: 'white',
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
          alert(`The generated nonce is:\n${nonce}`);

          fetch('process-payment', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              nonce: nonce
            })
          })
            .catch(err => {
              alert('Network error: ' + err);
            })
            .then(Response => {
              // if (!Response.ok) {
              //   return Response.text().then(errorInfo => Promise.reject(errorInfo));
              // }
              // return Response.text();
            })
            .then(data => {
              console.log(JSON.stringify(data));
              alert('Payment complete successfully!\nCheck browser developer console for more details');
            })
            .catch(err => {
              console.error(err);
              alert('Payment failed to complete!\nCheck browser developer console for more details');
            });
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

}


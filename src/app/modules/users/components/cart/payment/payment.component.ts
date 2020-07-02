import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { OrderPlacingService } from 'src/app/services/order-placing.service';
import { Subscription, concat } from 'rxjs';
import { Order } from 'src/app/models/Order';
import { tap, concatMap } from 'rxjs/operators';
import { CartBadgeService } from 'src/app/services/cart-badge.service';
import { ThemeService } from 'src/app/services/theme.service';

declare var SqPaymentForm: any; //magic to allow us to access the SquarePaymentForm lib

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentComponent implements OnInit, OnDestroy {

  paymentForm; //this is our payment form object
  totalPrice: number;
  order: Order;
  subscriptions: Subscription;
  processingPayment: boolean;
  success: boolean;
  darkThemeOn: boolean = false;

  public errorMessage: string = null;

  constructor(private orderService: OrderPlacingService, private badgeService: CartBadgeService,
    private themeService: ThemeService) {
    this.processingPayment = false;
    this.success = false;
  }

  ngOnInit() {
    this.order = this.orderService.order;
    this.subscriptions = new Subscription();

    var applicationId = "sandbox-sq0idb-S7VRotepCHWB8XgYxKZIsQ";
    var locationId = "P80ND85DPV3BR";

    this.subscriptions.add(this.themeService.darkThemeOn$.subscribe(on => {

      this.darkThemeOn = on;
      let textColor: string = "";

      this.darkThemeOn ? textColor = "#e1e1e1" : textColor = "#1e1e1e";

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
          color: textColor
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

            console.log(cardData);
            if (errors) {
              // Log errors from nonce generation to the browser developer console.
              console.error('Encountered errors:');
              errors.forEach(error => {
                console.error('  ' + error.message);

                (<HTMLHeadingElement>document.getElementById('message')).textContent = error.message;
                (<HTMLHeadingElement>document.getElementById('error')).style.visibility = "visible";
              });


              return;
            }

            (<HTMLInputElement>document.getElementById('card-nonce')).value = nonce;
            (<HTMLButtonElement>document.getElementById('post-order')).click();
          }
        }
      });
    }));

    this.paymentForm.build();
  }

  requestCardNonce(event) {

    // Don't submit the form until SqPaymentForm returns with a nonce
    event.preventDefault();

    // Request a nonce from the SqPaymentForm object
    this.paymentForm.requestCardNonce();
  }

  nonceReceived(nonce): void {

    (<HTMLHeadingElement>document.getElementById('message')).textContent = "";
    (<HTMLHeadingElement>document.getElementById('error')).style.visibility = "hidden";

    this.processingPayment = true;

    this.orderService.postOrder()
      .pipe(
        tap(data => console.log(data)),
        concatMap(data => this.orderService.postPayment(nonce, data['id'], data['totalPrice'])),
        tap(() => this.success = true),
        tap(() => this.badgeService.orderPaid())
      ).subscribe();

  }

  public closeErrors(): void {
    (<HTMLHeadingElement>document.getElementById('message')).textContent = "";
    (<HTMLHeadingElement>document.getElementById('error')).style.visibility = "hidden";
  }

  ngOnDestroy() {
    if (this.subscriptions)
      this.subscriptions.unsubscribe();
  }
}


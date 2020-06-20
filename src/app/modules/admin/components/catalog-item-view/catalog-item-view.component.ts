import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, } from 'rxjs';
import { CatalogObject } from 'src/app/models/CatalogObject';
import { CatalogService } from 'src/app/services/catalog.service';
import { ActivatedRoute } from '@angular/router';
import { tap, concat, take } from 'rxjs/operators';

@Component({
  selector: 'app-catalog-item-view',
  templateUrl: './catalog-item-view.component.html',
  styleUrls: ['./catalog-item-view.component.css']
})
export class CatalogItemViewComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  protected catalogObject: CatalogObject;

  constructor(private route: ActivatedRoute, private catalogService: CatalogService) { }

  ngOnInit() {
    this.subscriptions = new Subscription();

    let id, type: string;


    let pathVariable$ = this.route.params.pipe(tap(params => id = params['id']), take(1));
    let queryParams$ = this.route.queryParams.pipe(tap(params => type = params['type']));

    let getParams$ = pathVariable$.pipe(concat(queryParams$));

    this.subscriptions.add(getParams$.subscribe(
      () => this.catalogObject = this.catalogService.getObjectByIdAndType(id, type)
    ));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, } from 'rxjs';
import { CatalogObject } from 'src/app/models/CatalogObject';
import { CatalogService } from 'src/app/services/catalog.service';
import { ActivatedRoute } from '@angular/router';
import { tap, concat, take } from 'rxjs/operators';
import { CatalogEditService } from 'src/app/services/catalog-edit.service';

@Component({
  selector: 'app-catalog-item-view',
  templateUrl: './catalog-item-view.component.html',
  styleUrls: ['./catalog-item-view.component.css']
})
export class CatalogItemViewComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  public catalogObject: CatalogObject;

  public type: string;

  constructor(private route: ActivatedRoute, private catalogService: CatalogService,
    private editService: CatalogEditService) { }

  ngOnInit() {
    this.subscriptions = new Subscription();

    let id: string;

    let pathVariable$ = this.route.params.pipe(tap(params => id = params['id']), take(1));
    let queryParams$ = this.route.queryParams.pipe(tap(params => this.type = params['type']));

    let getParams$ = pathVariable$.pipe(concat(queryParams$));

    this.subscriptions.add(getParams$.subscribe(
      () => {
        this.catalogObject = this.catalogService.getObjectByIdAndType(id, this.type);
      }
    ));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public imageChanged(image: File): void {
    this.editService.imageSelected(image, this.catalogObject.id);
  }

}

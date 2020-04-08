import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { QueryTag } from 'src/app/models/queryTag.model';

const queriesSaved = gql`
  query queriesSaved($limit: Int!){
    queriesSaved(limit: $limit) {
      query
      result {
        title
        description
        thumbnails {
          medium {
            url
          }
        }
      }
    }
  }
`;


@Component({
  selector: 'app-queries-saved',
  templateUrl: './queries-saved.component.html',
  styleUrls: ['./queries-saved.component.scss']
})
export class QueriesSavedComponent implements OnInit, OnDestroy {
  @Output() tagChange: EventEmitter<any> = new EventEmitter();
  loading: boolean;
  data: any;

  private querySubscription: Subscription;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.querySubscription = this.apollo.watchQuery<QueryTag>({
      query: queriesSaved,
      variables: {
        limit: 10,
      },
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.data = data;
      });
  }

  selectTag(tag) {
    this.tagChange.emit(tag);
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

}

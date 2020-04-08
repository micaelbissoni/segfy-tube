import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { QueryTag } from './models/queryTag.model';

// We use the gql tag to parse our query string into a query document
const searchVideos = gql`
    mutation searchVideo($video: SearchInput!) {
      searchVideo(video: $video) {
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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'SegfyTube';
  searchBarIsVisible = true;

  searchForm = this.fb.group({
    query: new FormControl('', [Validators.required]),
  });

  loading: boolean;
  data: any = {
    searchVideo: {
      result: [],
    }
  };

  private querySubscription: Subscription;

  constructor(private fb: FormBuilder, private apollo: Apollo) { }

  ngOnInit() { }

  onSubmit() {
    this.querySubscription = this.apollo.mutate({
      mutation: searchVideos,
      variables: {
        video: this.searchForm.value
      }
    }).subscribe(({ data }) => {
      this.data = data;
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  toggleSearchBar() {
    this.searchBarIsVisible = !this.searchBarIsVisible;
  }

  selectTag(tag) {
    console.log('selectTag:', tag);
    this.searchForm.controls.query.setValue(tag.query);
    this.data.searchVideo.result = tag.result;
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

}

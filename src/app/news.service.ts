import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Source {
  id: string;
  name: string;
}

export interface Article {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
}

export interface RootObject {
  status: string;
  totalResults: number;
  articles: Article[];
}

@Injectable({
  providedIn: 'root'
})

export class NewsService {
  apiKey = '930112f51e2b4e189067228437b006ac';
  constructor(public http: HttpClient) { }

  getNews = () =>  this.http.get<RootObject>(`https://newsapi.org/v2/top-headlines?country=it&
  &apiKey=${this.apiKey}`, {}).toPromise();
  searchNews = (search: string) => this.http.get<RootObject>(`https://newsapi.org/v2/everything?q=${search}&apiKey=${this.apiKey}`, {})
  .toPromise();

  getCategory = (category: string) => this.http.get<RootObject>(`https://newsapi.org/v2/
top-headlines?country=it&category=${category}&apiKey=${this.apiKey}`,{}).toPromise();
};

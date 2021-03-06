import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionSheetController } from '@ionic/angular';
import { Article, NewsService } from '../news.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  news: Article[] = [];
  searching: string;
  category: string;

  constructor(public newsService: NewsService, public actionSheetController: ActionSheetController) {}

  async ngOnInit() {
      const {articles} = await this.newsService.getNews();
      console.log('obj:', articles);
      this.news = articles;
  };
  async searchTo(){
    const {articles} = await this.newsService.searchNews(this.searching);
      console.log('obj:', articles);
      this.news = articles;
  };
  async searchByCategory(category: string){
    const {articles} = await this.newsService.getCategory(category);
    this.news = articles;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Sports',
        icon: 'football-outline',
        handler: async () => {
         await this.searchByCategory('sport') ;
        }
      }, {
        text: 'Share',
        icon: 'share',
        data: 10,
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'caret-forward-circle',
        data: 'Data value',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

};

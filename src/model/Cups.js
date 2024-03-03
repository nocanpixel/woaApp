// model/Post.js
import { Model } from '@nozbe/watermelondb'
import { field, text } from '@nozbe/watermelondb/decorators'


export default class Cups extends Model {
  static table = 'cups'

  @field('date') date;
  @field('glass1') glass1;
  @field('glass2') glass2;
  @field('glass3') glass3;
  @field('glass4') glass4;
  @field('glass5') glass5;
  @field('glass6') glass6;
  @field('glass7') glass7;
  @field('glass8') glass8;
  @field('total') total;
}
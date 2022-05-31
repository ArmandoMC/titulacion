import { Component, OnInit ,Input,Output,EventEmitter,OnChanges, AfterViewInit,OnDestroy,SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit ,OnChanges,AfterViewInit,OnDestroy{

  img:string='';

  @Input('img')
  set changeImage(newImg:string){
    this.img=newImg;
    // console.log('change just img=>', this.img);

  }
  @Input() alt:string='';

  @Output() loaded=new EventEmitter<string>();
  imgDefault='../../../assets/images/default.png';
  // counter=0;
  // counterFn:number |undefined;
  url:string='https://www.w3schools.com/howto/img_avatar.png'

  constructor(

  ) {
    //before render
    //NO async -- once time
    // console.log('constructor','imgValue=>',this.img);

   }

   ngOnChanges(changes:SimpleChanges): void {
      //before and during render
      // changes inputs - times
      // console.log('ngOnChanges','imgValue=>',this.img);
      // console.log('changes ',changes);

   }

  ngOnInit() {
    //before render
    //async - fetch -promises - subscripcions  -- once time
    // console.log('ngOnInit','imgValue=>',this.img);
    // this.counterFn= window.setInterval(()=>{
    //   this.counter+=1;
    //   console.log('run counter');
    // },1000)

  }
  ngAfterViewInit(): void {
    //after render
    //handler children
    // console.log('ngAfterViewInit');

  }
  ngOnDestroy(): void {
      //delete
      // console.log('ngOnDestroy');
      // window.clearInterval(this.counterFn);

  }

  imgError(){
    this.img=this.imgDefault;
  }
  imgLoaded(){
    // console.log('log hijo');
    this.loaded.emit(this.img);
  }

}

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as uuid from 'uuid';
import * as $ from 'jquery';
import { } from 'googlemaps';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  controlId = uuid.v4();
  map: google.maps.Map;
  markers: google.maps.Marker[] = [];
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    //this.mapOption = new GoogleMapOption(this.option);
    this.map = new google.maps.Map(document.getElementById(this.controlId), {
      zoom: 15,
      center: { lat: 10.8230989, lng: 106.6296638 }
    });
    // setTimeout(()=>{
    //   let marker = new google.maps.Marker({
    //     position: { lat: 10.8230989, lng: 106.6296638 },
    //     map: this.map
    //   });
    //   marker.addListener('click',function(){
    //     console.log(this.position.lat());
    //     console.log(this.position.lng());
    //   });
    //   this.markers.push(marker);
    // },1000);

    setTimeout(() => {
      let marker = new google.maps.Marker({
        position: { lat: 10.8230989, lng: 106.6296638 },
        map: this.map,
        draggable: true,
      });
      marker.set('data',{code:'SuperDev'});
      // marker.addListener('click',function(){
      //   console.log(this.position.lat());
      //   console.log(this.position.lng());
      // });
      marker.addListener('dragend', function () {
        let that:google.maps.Marker = this;
        console.log(that.getPosition().lat());
        console.log(that.getPosition().lng());
        console.log(that.get('data'));
      });
      this.markers.push(marker);
    }, 1000);

    setTimeout(() => {
      this.drawButton('Btn 1',()=>{
        alert('Btn 1');
      });
    }, 1000);


    // setTimeout(()=>{
    //   this.markers.forEach(marker=>{
    //     marker.setMap(null);
    //   });
    // },5000);
    // setTimeout(()=>{
    //   this.markers.forEach(marker=>{
    //     marker.setMap(this.map);
    //   });
    // },10000);
  }

  drawButton(title: string, click: Function) {
    let elementId = uuid.v4();
    let element = `<button id="${elementId}" class="btn btn-primary" title="test">${title}</button>`;
    $('body').append(element);
    $(`#${elementId}`).click(() => {
      click();
    });
    // controlDiv.index = 1;
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById(elementId));
  }
}

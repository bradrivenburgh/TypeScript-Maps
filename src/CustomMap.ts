// Limit access to Google Map methods to reduce
// chances of breaking app down the road

// Instructions to every other class on how they
// can be an argument to 'addMarker'
export interface Mappable {
  location: { lat: number; lng: number };
  markerContent(): string;
}

export class CustomMap {
  private googleMap: google.maps.Map; // google.maps.Map is the instance/type

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.querySelector(divId), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0,
      },
    });
  }

  addMarker(entity: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: entity.location.lat,
        lng: entity.location.lng,
      },
    });

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: `${entity.markerContent()}`,
      });
      infoWindow.open(this.googleMap, marker);
    });
  }
}

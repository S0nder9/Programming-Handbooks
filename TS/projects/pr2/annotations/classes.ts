class VehicleCl {
  //   public drive(): void {
  //     console.log("I`m driving");
  //   }
  //   color: string = "red";
  //   constructor(color: string) {
  //     this.color = color;
  //   }

  constructor(public color: string) {}

  public stop(): void {
    console.log("I`m stopping");
  }

  protected beep(): void {
    console.log("beep");
  }
}

class Car extends VehicleCl {
  constructor(public wheels: number, color: string) {
    super(color);
  }
  private drive(): void {
    console.log("I`m driving a car");
  }

  public startDrivingProcess(): void {
    this.drive();
    this.beep();
  }
}

const vehicle = new VehicleCl("black");
// vehicle.drive();
// vehicle.stop();
console.log(vehicle.color);

const newCar = new Car(4, "silver");
newCar.startDrivingProcess();
newCar.stop();

export class NationModel {
  constructor(
    public title: string,
    public location: string,
    public creationDatetime: Date,
    // public endDatetime: Date,
    public viewPublic: boolean,
    public description?: string,
    public _id?: string,
  ) { }
}
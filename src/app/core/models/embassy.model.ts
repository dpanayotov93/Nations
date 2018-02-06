export class EmbassyModel {
  constructor(
    public userId: string,
    public name: string,
    public nationId: string,
    public attending: boolean,
    public guests?: number,
    public comments?: string,
    public _id?: string
  ) { }
}
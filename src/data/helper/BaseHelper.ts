import { BaseApiService } from "../service/BaseApiService"

export class BaseHelper<T>
{
    service:BaseApiService<T>;

    constructor(service:BaseApiService<T>)
    {
        this.service=service;
    }
   
    async add (endpoint:string, data:T){
        return await this.service.create(endpoint,data);
    }
    async edit (endpoint:string,id:string,data:T){
        return await this.service.update(endpoint, id, { ...data });
    }
 
}
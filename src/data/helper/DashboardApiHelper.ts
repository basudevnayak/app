import { DashboardApiService } from "../service/DashboardApiService";
import { DashboardCountResponse } from "../models/response";

export class DashboardApiHelper {
  private service = new DashboardApiService();

  async getCounts(): Promise<DashboardCountResponse> {
    return this.service.getCounts();
  }
}

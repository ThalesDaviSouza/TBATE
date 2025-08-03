import { CreateUserFacade } from "./Application/facades/createUserFacade.js";
import { UserService } from "./Domain/services/userService.js";

const userService = new UserService();
const createUserFacade = new CreateUserFacade(userService);

export function getCreateUserFacade(){
  return createUserFacade;
}


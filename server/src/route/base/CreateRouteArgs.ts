import { ArgsType, Field } from "@nestjs/graphql";
import { RouteCreateInput } from "./RouteCreateInput";

@ArgsType()
class CreateRouteArgs {
  @Field(() => RouteCreateInput, { nullable: false })
  data!: RouteCreateInput;
}

export { CreateRouteArgs };

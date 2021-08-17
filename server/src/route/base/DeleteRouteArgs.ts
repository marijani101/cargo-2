import { ArgsType, Field } from "@nestjs/graphql";
import { RouteWhereUniqueInput } from "./RouteWhereUniqueInput";

@ArgsType()
class DeleteRouteArgs {
  @Field(() => RouteWhereUniqueInput, { nullable: false })
  where!: RouteWhereUniqueInput;
}

export { DeleteRouteArgs };

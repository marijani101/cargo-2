import { ArgsType, Field } from "@nestjs/graphql";
import { RouteWhereUniqueInput } from "./RouteWhereUniqueInput";
import { RouteUpdateInput } from "./RouteUpdateInput";

@ArgsType()
class UpdateRouteArgs {
  @Field(() => RouteWhereUniqueInput, { nullable: false })
  where!: RouteWhereUniqueInput;
  @Field(() => RouteUpdateInput, { nullable: false })
  data!: RouteUpdateInput;
}

export { UpdateRouteArgs };

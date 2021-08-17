import { ArgsType, Field } from "@nestjs/graphql";
import { RouteWhereUniqueInput } from "./RouteWhereUniqueInput";

@ArgsType()
class RouteFindUniqueArgs {
  @Field(() => RouteWhereUniqueInput, { nullable: false })
  where!: RouteWhereUniqueInput;
}

export { RouteFindUniqueArgs };

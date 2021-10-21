import {Inject, Module} from "@tsed/di";
import {ApolloServer} from "@tsed/apollo";
import {TypeGraphQLService} from "@tsed/typegraphql";
import {MyDataSource} from "./datasources/MyDataSource";
import {RecipeResolver} from "./recipes/RecipeResolver";

@Module({
  imports: [MyDataSource],
  graphql: {
    default: {
      path: "/",
      buildSchemaOptions: {
        resolvers: [RecipeResolver]
      }
    }
  }
})
export class GraphQLModule {
  @Inject()
  protected typeGraphQLService: TypeGraphQLService;

  private server?: ApolloServer;

  public $onReady(): void | Promise<void> {
    this.server = this.typeGraphQLService.get("default");

    //  console.log("The server is here:", this.server)
  }
}

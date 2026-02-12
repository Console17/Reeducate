import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PostPayload } from './payload/post.payload';
import { UseGuards } from '@nestjs/common';
import { IsAuthGuard } from 'src/auth/guards/is-auth.guard';

@Resolver('Post')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => PostPayload)
  @UseGuards(IsAuthGuard)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @Context() context: { req: { userId: string } },
  ) {
    return this.postsService.create(context.req.userId, createPostInput);
  }

  @Query(() => [PostPayload])
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Query(() => PostPayload)
  @UseGuards(IsAuthGuard)
  getPostById(@Args('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Mutation(() => PostPayload)
  @UseGuards(IsAuthGuard)
  updatePostById(
    @Args('id') id: string,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    return this.postsService.update(id, updatePostInput);
  }

  @Mutation(() => PostPayload)
  @UseGuards(IsAuthGuard)
  deletePostById(@Args('id') id: string) {
    return this.postsService.remove(id);
  }
}

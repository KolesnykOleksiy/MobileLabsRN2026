export const newsData = Array.from({ length: 50 }, (_, index) => ({
  id: index.toString(),
  title: `News Title ${index + 1}`,
  description: `This is the description for news item number ${index + 1}. It contains detailed information about the topic.`,
  image: `https://picsum.photos/seed/${index}/200/150`,
}));

// import articleApi from "@/apis/article.api";
// import { queryKeys } from "@/constants/queryKey";
// import { AppContext } from "@/context/app";
// import { InfiniteQueryResponse } from "@/lib/utils";
// import { Articles } from "@/types/article.type";
// import { User } from "@/types/user.type";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useContext } from "react";
// import { toast } from "react-toastify";

// export const useToggleFavorite = () => {
//   const queryClient = useQueryClient();
//   const { profile, tag } = useContext(AppContext);

//   const { mutate: favorite, isPending } = useMutation({
//     mutationFn: (id: number) => articleApi.postToggleFavorite(id),
//     onMutate: async (id: number) => {
//       console.log(id);

//       await queryClient.cancelQueries({
//         queryKey: queryKeys.getAllFavoriteArticles(),
//       });
//       await queryClient.cancelQueries({
//         queryKey: queryKeys.getAllMyArticles(),
//       });
//       await queryClient.cancelQueries({
//         queryKey: queryKeys.getAllArticles(),
//       });
//       if (tag) {
//         await queryClient.cancelQueries({
//           queryKey: queryKeys.getAllTagArticles(tag),
//         });
//       }

//       const previousArticles = {
//         allArticles: queryClient.getQueryData(queryKeys.getAllArticles()),
//         myArticles: queryClient.getQueryData(queryKeys.getAllMyArticles()),
//         favoriteArticles: queryClient.getQueryData(
//           queryKeys.getAllFavoriteArticles()
//         ),
//         tagArticles: queryClient.getQueryData(
//           queryKeys.getAllTagArticles(tag ?? "")
//         ),
//       };

//       queryClient.setQueryData(
//         queryKeys.getAllArticles(),
//         (oldArticles: any) => {
//           console.log(oldArticles);

//           return oldArticles?.pages[0].data.data.items.map(
//             (article: Articles) =>
//               article.id === id
//                 ? {
//                     ...article,
//                     favoritedBy: toggleFavorite(article.favoritedBy),
//                   }
//                 : article
//           );
//         }
//       );
//       queryClient.setQueryData(
//         queryKeys.getAllMyArticles(),
//         (oldArticles: InfiniteQueryResponse<Articles>) => {
//           console.log(oldArticles.pages.data?.data.items);

//           return oldArticles?.pages.data.data.items.map((article: Articles) =>
//             article.id === id
//               ? {
//                   ...article,
//                   favoritedBy: toggleFavorite(article.favoritedBy),
//                 }
//               : article
//           );
//         }
//       );

//       queryClient.setQueryData(
//         queryKeys.getAllFavoriteArticles(),
//         (oldArticles: InfiniteQueryResponse<Articles>) => {
//           return oldArticles?.pages[0].data.data.items.map(
//             (article: Articles) =>
//               article.id === id
//                 ? {
//                     ...article,
//                     favoritedBy: toggleFavorite(article.favoritedBy),
//                   }
//                 : article
//           );
//         }
//       );

//       if (tag) {
//         queryClient.setQueryData(
//           queryKeys.getAllTagArticles(tag),
//           (oldArticles: InfiniteQueryResponse<Articles>) => {
//             return oldArticles?.pages[0].data.data.items.map(
//               (article: Articles) =>
//                 article.id === id
//                   ? {
//                       ...article,
//                       favoritedBy: toggleFavorite(article.favoritedBy),
//                     }
//                   : article
//             );
//           }
//         );
//       }

//       // Trả lại context để sử dụng cho rollback nếu cần
//       return { previousArticles };
//     },

//     onError: (err, id, context) => {
//       console.error("Error:", err);
//       console.log("context", context);

//       if (context?.previousArticles) {
//         queryClient.setQueryData(
//           queryKeys.getAllArticles(),
//           context.previousArticles.allArticles
//         );
//         queryClient.setQueryData(
//           queryKeys.getAllMyArticles(),
//           context.previousArticles.myArticles
//         );
//         queryClient.setQueryData(
//           queryKeys.getAllFavoriteArticles(),
//           context.previousArticles.favoriteArticles
//         );
//         if (tag) {
//           queryClient.setQueryData(
//             queryKeys.getAllTagArticles(tag),
//             context.previousArticles.tagArticles
//           );
//         }
//       }
//       toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({
//         queryKey: queryKeys.getAllArticles(),
//       });
//       queryClient.invalidateQueries({
//         queryKey: queryKeys.getAllMyArticles(),
//       });
//       queryClient.invalidateQueries({
//         queryKey: queryKeys.getAllFavoriteArticles(),
//       });
//       if (tag) {
//         queryClient.invalidateQueries({
//           queryKey: queryKeys.getAllTagArticles(tag),
//         });
//       }
//     },
//     onSuccess() {
//       toast.success("Thích thành công");
//     },
//   });

//   const toggleFavorite = (favoritedBy: User[]) => {
//     if (profile) {
//       const isFavorited = favoritedBy.some((user) => user.id === profile.id);
//       if (isFavorited) {
//         return favoritedBy.filter((user) => user.id !== profile.id);
//       } else {
//         return [...favoritedBy, profile];
//       }
//     }
//     return favoritedBy;
//   };

//   return { favorite, isPending };
// };

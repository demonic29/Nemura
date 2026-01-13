// NewsListItem.tsx

"use client";

import SafeImage from "@/components/SafeImage";
import { AddCircleIcon, RemoveCircleIcon, PlayCircleIcon } from "@icons/index";
import { useState } from "react";

type NewsListItemProps = {
  title: string;
  imageUrl: string;
  subject: string | string[];
  isAdded?: boolean; // 追加済みかどうか
  onClick?: () => void;
  onToggleAdd?: (added: boolean) => void; // 追加・削除切り替え用
  onPlayClick?: (e: React.MouseEvent) => void;
};

const NewsListItem = ({
  title,
  imageUrl,
  subject,
  isAdded = false,
  onClick,
  onToggleAdd,
  onPlayClick,
}: NewsListItemProps) => {
  const displaySubject = Array.isArray(subject) ? subject[0] : subject || "未分類";
  const [added, setAdded] = useState(isAdded);

  const handleToggleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAdded(!added);
    onToggleAdd?.(!added);
  };

  return (
    <div
      onClick={onClick}
      className="flex space-x-3 bg-[#3A86FF]/10 rounded-xl p-2 relative cursor-pointer hover:bg-[#3A86FF]/20 transition-colors"
    >
      {/* サムネイル */}
      <div className="w-20 h-20 relative flex-shrink-0">
        <SafeImage
          src={imageUrl}
          alt={title}
          fill
          sizes="80px"
          className="object-cover rounded-lg"
        />
      </div>

      {/* テキスト */}
      <div className="flex-grow flex flex-col relative">
        <h3 className="text-base font-semibold line-clamp-2 pr-14 text-white">
          {title}
        </h3>
        <div className="absolute bottom-2 left-0 text-xs text-gray-400">
          {displaySubject}
        </div>
      </div>

      {/* アクションボタン */}
      <div className="absolute bottom-2 right-2 flex items-center space-x-2">
        {/* 追加／削除ボタン */}
        <button
          onClick={handleToggleAdd}
          className="p-1 hover:opacity-70 transition-opacity"
        >
          {added ? (
            <RemoveCircleIcon className="w-7 h-7 text-gray-400" />
          ) : (
            <AddCircleIcon className="w-7 h-7 text-gray-400" />
          )}
        </button>

        {/* 再生ボタン */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPlayClick?.(e);
          }}
          className="p-1 hover:opacity-70 transition-opacity"
        >
          <PlayCircleIcon className="w-7 h-7 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default NewsListItem;
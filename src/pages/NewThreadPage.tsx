import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Image, Code, Type, Bold, Italic, List, Link as LinkIcon, Eye, Save } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { categories, availableTags, threads, Thread, Category } from '../data/forumData';
import { Breadcrumbs } from '../components/Breadcrumbs';

export function NewThreadPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [body, setBody] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [showHtmlEditor, setShowHtmlEditor] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Автосохранение черновика
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title || body) {
        localStorage.setItem('thread-draft', JSON.stringify({
          title,
          categoryId,
          selectedTags,
          body,
          timestamp: Date.now()
        }));
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [title, categoryId, selectedTags, body]);

  // Загрузка черновика
  useEffect(() => {
    const draft = localStorage.getItem('thread-draft');
    if (draft) {
      try {
        const data = JSON.parse(draft);
        // Предлагаем восстановить черновик, если он моложе 24 часов
        if (Date.now() - data.timestamp < 86400000) {
          if (confirm('Найден несохранённый черновик. Восстановить?')) {
            setTitle(data.title || '');
            setCategoryId(data.categoryId || '');
            setSelectedTags(data.selectedTags || []);
            setBody(data.body || '');
          }
        }
      } catch (e) {
        console.error('Failed to load draft:', e);
      }
    }
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Заголовок обязателен';
    } else if (title.length < 8) {
      newErrors.title = 'Заголовок должен быть не короче 8 символов';
    } else if (title.length > 120) {
      newErrors.title = 'Заголовок не должен превышать 120 символов';
    }

    if (!categoryId) {
      newErrors.category = 'Выберите категорию';
    }

    if (!body.trim()) {
      newErrors.body = 'Тело темы обязательно';
    } else if (body.length < 20) {
      newErrors.body = 'Тема должна содержать не менее 20 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Создание новой темы
    const newThread: Thread = {
      id: `thread-${Date.now()}`,
      categoryId,
      authorId: 'current-user',
      authorName: 'Вы',
      authorRank: 'viking',
      title: title.trim(),
      excerpt: body.substring(0, 150) + '...',
      tags: selectedTags,
      isPinned: false,
      isLocked: false,
      isResolved: false,
      isHot: false,
      viewsCount: 0,
      repliesCount: 0,
      usefulCount: 0,
      followersCount: 1,
      readersNow: [],
      createdAt: 'только что',
      updatedAt: 'только что',
    };

    // Сохраняем в localStorage для демо
    const existingThreads = JSON.parse(localStorage.getItem('user-threads') || '[]');
    existingThreads.push(newThread);
    localStorage.setItem('user-threads', JSON.stringify(existingThreads));

    // Очищаем черновик
    localStorage.removeItem('thread-draft');

    // Перенаправляем на созданную тему
    const category = categories.find((c: Category) => c.id === categoryId);
    navigate(`/ting/${category?.slug || 'ting'}/${newThread.id}`);
  };

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const insertMarkdown = (syntax: string) => {
    const textarea = document.getElementById('body-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = body.substring(start, end);

    let newText = '';
    switch (syntax) {
      case 'bold':
        newText = `**${selectedText || 'жирный текст'}**`;
        break;
      case 'italic':
        newText = `*${selectedText || 'курсив'}*`;
        break;
      case 'list':
        newText = `\n- ${selectedText || 'пункт списка'}`;
        break;
      case 'link':
        newText = `[${selectedText || 'текст ссылки'}](https://)`;
        break;
      case 'image':
        newText = `![описание](${selectedText || 'https://example.com/image.jpg'})`;
        break;
      case 'code':
        newText = showHtmlEditor 
          ? `\n\`\`\`html\n${selectedText || '<!-- ваш HTML код -->'}\n\`\`\`\n`
          : `\n\`\`\`\n${selectedText || 'код'}\n\`\`\`\n`;
        break;
    }

    setBody(body.substring(0, start) + newText + body.substring(end));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumbs />

      {/* Заголовок */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Назад"
          >
            <ArrowLeft size={20} className="text-norse-muted" />
          </button>
          <h1 className="font-[Cormorant] text-3xl md:text-4xl font-bold text-norse-gold">
            Создать тему
          </h1>
        </div>
        <p className="text-norse-muted">
          Поделитесь знаниями, задайте вопрос или начните обсуждение
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Категория */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-semibold text-norse-text mb-2">
            Категория <span className="text-red-400">*</span>
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className={`w-full px-4 py-3 bg-black/40 border rounded-lg text-norse-text focus:outline-none transition-colors ${
              errors.category ? 'border-red-500' : 'border-amber-900/30 focus:border-amber-500/50'
            }`}
          >
            <option value="">Выберите категорию...</option>
            {categories.map((cat: Category) => (
              <option key={cat.id} value={cat.id}>
                {cat.rune} {cat.title}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-400 text-xs mt-1">{errors.category}</p>
          )}
        </motion.div>

        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-semibold text-norse-text mb-2">
            Заголовок <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Кратко и по сути..."
              maxLength={120}
              className={`w-full px-4 py-3 bg-black/40 border rounded-lg text-norse-text placeholder-norse-muted/50 focus:outline-none transition-colors ${
                errors.title ? 'border-red-500' : 'border-amber-900/30 focus:border-amber-500/50'
              }`}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-norse-muted">
              {title.length}/120
            </div>
          </div>
          {errors.title && (
            <p className="text-red-400 text-xs mt-1">{errors.title}</p>
          )}
        </motion.div>

        {/* Теги */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-semibold text-norse-text mb-2">
            Теги (максимум 3)
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag: string) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag)}
                disabled={!selectedTags.includes(tag) && selectedTags.length >= 3}
                className={`px-3 py-1 text-xs rounded border transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-amber-600/20 text-amber-400 border-amber-600/40'
                    : 'bg-black/30 text-norse-muted border-amber-900/20 hover:border-amber-600/40 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Редактор */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-semibold text-norse-text mb-2">
            Содержание <span className="text-red-400">*</span>
          </label>

          {/* Панель инструментов */}
          <div className="flex items-center gap-2 mb-2 p-2 bg-black/40 border border-amber-900/30 rounded-t-lg">
            <button
              type="button"
              onClick={() => insertMarkdown('bold')}
              className="p-2 rounded hover:bg-white/10 transition-colors"
              title="Жирный (Ctrl+B)"
              aria-label="Жирный"
            >
              <Bold size={16} className="text-norse-muted hover:text-norse-text" />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown('italic')}
              className="p-2 rounded hover:bg-white/10 transition-colors"
              title="Курсив (Ctrl+I)"
              aria-label="Курсив"
            >
              <Italic size={16} className="text-norse-muted hover:text-norse-text" />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown('list')}
              className="p-2 rounded hover:bg-white/10 transition-colors"
              title="Список"
              aria-label="Список"
            >
              <List size={16} className="text-norse-muted hover:text-norse-text" />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown('link')}
              className="p-2 rounded hover:bg-white/10 transition-colors"
              title="Ссылка"
              aria-label="Ссылка"
            >
              <LinkIcon size={16} className="text-norse-muted hover:text-norse-text" />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown('image')}
              className="p-2 rounded hover:bg-white/10 transition-colors"
              title="Изображение"
              aria-label="Изображение"
            >
              <Image size={16} className="text-norse-muted hover:text-norse-text" />
            </button>
            <button
              type="button"
              onClick={() => {
                setShowHtmlEditor(!showHtmlEditor);
                insertMarkdown('code');
              }}
              className={`p-2 rounded transition-colors ${
                showHtmlEditor ? 'bg-amber-600/20 text-amber-400' : 'hover:bg-white/10'
              }`}
              title="HTML код"
              aria-label="HTML код"
            >
              <Code size={16} />
            </button>

            <div className="flex-1" />

            {/* Размер шрифта */}
            <div className="flex items-center gap-2">
              <Type size={16} className="text-norse-muted" />
              <select
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="px-2 py-1 bg-black/40 border border-amber-900/30 rounded text-xs text-norse-text focus:outline-none"
              >
                <option value={14}>14px</option>
                <option value={16}>16px</option>
                <option value={18}>18px</option>
                <option value={20}>20px</option>
              </select>
            </div>

            {/* Переключатель предпросмотра */}
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors ${
                showPreview
                  ? 'bg-amber-600/20 text-amber-400 border border-amber-600/40'
                  : 'hover:bg-white/10 text-norse-muted'
              }`}
            >
              <Eye size={16} />
              <span className="text-xs">Предпросмотр</span>
            </button>
          </div>

          {/* Текстовое поле или предпросмотр */}
          {showPreview ? (
            <div
              className="min-h-[400px] p-6 bg-black/40 border border-amber-900/30 rounded-b-lg overflow-y-auto"
              style={{ fontSize: `${fontSize}px`, lineHeight: '1.7' }}
            >
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {body || '*Ничего не написано...*'}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <textarea
              id="body-editor"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Напишите вашу тему здесь...&#10;&#10;Поддерживается Markdown:&#10;**жирный** *курсив*&#10;- список&#10;[ссылка](https://)&#10;![изображение](url)&#10;&#10;Или используйте HTML код..."
              className={`w-full min-h-[400px] p-4 bg-black/40 border rounded-b-lg text-norse-text placeholder-norse-muted/50 focus:outline-none transition-colors resize-y font-mono ${
                errors.body ? 'border-red-500' : 'border-amber-900/30 focus:border-amber-500/50'
              }`}
              style={{ fontSize: `${fontSize}px`, lineHeight: '1.7' }}
            />
          )}

          {errors.body && (
            <p className="text-red-400 text-xs mt-1">{errors.body}</p>
          )}

          <p className="text-xs text-norse-muted mt-2">
            Поддерживается Markdown и HTML. Изображения можно вставлять по URL.
          </p>
        </motion.div>

        {/* Кнопки действий */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between pt-6 border-t border-amber-900/20"
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-norse-muted hover:text-norse-text transition-colors"
          >
            Отмена
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                localStorage.setItem('thread-draft', JSON.stringify({
                  title,
                  categoryId,
                  selectedTags,
                  body,
                  timestamp: Date.now()
                }));
                alert('Черновик сохранён');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-amber-900/30 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Save size={16} />
              <span>Сохранить черновик</span>
            </button>

            <motion.button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold rounded-lg hover:from-amber-500 hover:to-amber-400 transition-all shadow-lg hover:shadow-amber-500/50"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-xl font-serif">ᛏ</span>
              <span>Опубликовать</span>
            </motion.button>
          </div>
        </motion.div>
      </form>
    </div>
  );
}

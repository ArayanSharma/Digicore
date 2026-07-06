import { useEffect, useMemo, useRef, useState } from "react";
import {
  Plus,
  Trash2,
  Pencil,
  Save,
  Image as ImageIcon,
  ArrowUp,
  ArrowDown,
  Search,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../Components/ui/tabs";
import Modal from "../../Components/admin/ui/Modal";
import AdminButton from "../../Components/admin/ui/AdminButton";
import AdminCard from "../../Components/admin/ui/AdminCard";
import PageHeader from "../../Components/admin/ui/PageHeader";
import Skeleton from "../../Components/admin/ui/Skeleton";
import EmptyState from "../../Components/admin/ui/EmptyState";
import { useToast } from "../../context/ToastContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const slugify = (text) =>
  (text || "")
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const Field = ({ label, children, error }) => (
  <label className="block">
    <span className="adm-label">{label}</span>
    {children}
    {error && <span className="block mt-1 text-xs text-red-500 font-medium">{error}</span>}
  </label>
);

const TextInput = (props) => <input {...props} className={`adm-input ${props.className || ""}`} />;
const TextArea = (props) => <textarea {...props} rows={props.rows || 3} className="adm-textarea" />;

const ImageInput = ({ label, value, onChange }) => {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`${API}/api/upload`, { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.url) {
        const fullUrl = data.url.startsWith("http") ? data.url : `${API}${data.url}`;
        onChange(fullUrl);
      } else {
        alert("Upload failed: " + (data.message || JSON.stringify(data)));
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Field label={label}>
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden shrink-0" style={{ border: "1px solid var(--border)", background: "var(--bg)" }}>
          {value ? <img src={value} alt="Preview" className="w-full h-full object-cover" /> : <ImageIcon size={18} style={{ color: "var(--text-light)" }} />}
        </div>
        <div className="flex items-center gap-2 flex-1">
          <TextInput type="text" placeholder="Image URL or upload" value={value || ""} onChange={(e) => onChange(e.target.value)} />
          <input type="file" accept="image/*" ref={fileRef} className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
          <AdminButton type="button" variant="secondary" onClick={() => fileRef.current && fileRef.current.click()} loading={uploading}>
            Upload
          </AdminButton>
        </div>
      </div>
    </Field>
  );
};

const emptyCategoryForm = { name: "", description: "", isActive: true };

const emptyServiceForm = {
  category: "",
  title: "",
  slug: "",
  shortDescription: "",
  longDescription: "",
  image: "",
  icon: "",
  features: [],
  ctaText: "Learn More",
  ctaLink: "",
  metaTitle: "",
  metaDescription: "",
  isActive: true,
};

export default function AdminServices() {
  const showToast = useToast();

  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [categoryForm, setCategoryForm] = useState(emptyCategoryForm);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [categoryErrors, setCategoryErrors] = useState({});
  const [categorySaving, setCategorySaving] = useState(false);

  const [serviceForm, setServiceForm] = useState(emptyServiceForm);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [serviceErrors, setServiceErrors] = useState({});
  const [serviceSaving, setServiceSaving] = useState(false);
  const [featureInput, setFeatureInput] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);

  const [serviceSearch, setServiceSearch] = useState("");
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState("all");

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [catRes, svcRes] = await Promise.all([
        fetch(`${API}/api/categories`),
        fetch(`${API}/api/services`),
      ]);
      const catData = await catRes.json();
      const svcData = await svcRes.json();
      setCategories(Array.isArray(catData.categories) ? catData.categories : []);
      setServices(Array.isArray(svcData.services) ? svcData.services : []);
    } catch (err) {
      console.error("Failed to load services/categories:", err);
      showToast("Failed to load catalog data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoryById = useMemo(() => {
    const map = {};
    categories.forEach((c) => (map[c._id] = c));
    return map;
  }, [categories]);

  const serviceCountByCategory = useMemo(() => {
    const map = {};
    services.forEach((s) => {
      const catId = s.category?._id || s.category;
      map[catId] = (map[catId] || 0) + 1;
    });
    return map;
  }, [services]);

  /* ---------------- Categories ---------------- */

  const openAddCategory = () => {
    setEditingCategoryId(null);
    setCategoryForm(emptyCategoryForm);
    setCategoryErrors({});
    setCategoryModalOpen(true);
  };

  const openEditCategory = (item) => {
    setEditingCategoryId(item._id);
    setCategoryForm({
      name: item.name || "",
      description: item.description || "",
      isActive: item.isActive !== false,
    });
    setCategoryErrors({});
    setCategoryModalOpen(true);
  };

  const closeCategoryModal = () => {
    setCategoryModalOpen(false);
    setEditingCategoryId(null);
    setCategoryForm(emptyCategoryForm);
    setCategoryErrors({});
  };

  const validateCategory = () => {
    const errs = {};
    if (!categoryForm.name.trim()) errs.name = "Name is required";
    setCategoryErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (!validateCategory()) return;
    setCategorySaving(true);
    try {
      const res = await fetch(`${API}/api/categories${editingCategoryId ? `/${editingCategoryId}` : ""}`, {
        method: editingCategoryId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Save failed");
      showToast(editingCategoryId ? "Category updated" : "Category added");
      closeCategoryModal();
      await fetchAll();
    } catch (err) {
      console.error(err);
      showToast(err.message || "Failed to save category", "error");
    } finally {
      setCategorySaving(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Delete this category? Categories with services cannot be deleted.")) return;
    try {
      const res = await fetch(`${API}/api/categories/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");
      setCategories((prev) => prev.filter((c) => c._id !== id));
      showToast("Category deleted");
    } catch (err) {
      console.error(err);
      showToast(err.message || "Failed to delete category", "error");
    }
  };

  const moveCategory = async (index, direction) => {
    const sorted = [...categories].sort((a, b) => (a.order || 0) - (b.order || 0));
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= sorted.length) return;
    const a = sorted[index];
    const b = sorted[targetIndex];
    try {
      await Promise.all([
        fetch(`${API}/api/categories/${a._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: b.order ?? targetIndex }),
        }),
        fetch(`${API}/api/categories/${b._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: a.order ?? index }),
        }),
      ]);
      await fetchAll();
    } catch (err) {
      console.error(err);
      showToast("Failed to reorder categories", "error");
    }
  };

  const handleToggleCategoryActive = async (item) => {
    try {
      const res = await fetch(`${API}/api/categories/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !item.isActive }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      setCategories((prev) => prev.map((c) => (c._id === item._id ? data.category : c)));
      showToast("Category status updated");
    } catch (err) {
      console.error(err);
      showToast(err.message || "Failed to update status", "error");
    }
  };

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => (a.order || 0) - (b.order || 0)),
    [categories]
  );

  /* ---------------- Services ---------------- */

  const openAddService = () => {
    setEditingServiceId(null);
    setServiceForm({ ...emptyServiceForm, category: categories[0]?._id || "" });
    setServiceErrors({});
    setFeatureInput("");
    setSlugTouched(false);
    setServiceModalOpen(true);
  };

  const openEditService = (item) => {
    setEditingServiceId(item._id);
    setServiceForm({
      category: item.category?._id || item.category || "",
      title: item.title || "",
      slug: item.slug || "",
      shortDescription: item.shortDescription || "",
      longDescription: item.longDescription || "",
      image: item.image || "",
      icon: item.icon || "",
      features: item.features || [],
      ctaText: item.ctaText || "Learn More",
      ctaLink: item.ctaLink || "",
      metaTitle: item.metaTitle || "",
      metaDescription: item.metaDescription || "",
      isActive: item.isActive !== false,
    });
    setServiceErrors({});
    setFeatureInput("");
    setSlugTouched(true);
    setServiceModalOpen(true);
  };

  const closeServiceModal = () => {
    setServiceModalOpen(false);
    setEditingServiceId(null);
    setServiceForm(emptyServiceForm);
    setServiceErrors({});
    setFeatureInput("");
    setSlugTouched(false);
  };

  const handleTitleChange = (value) => {
    setServiceForm((prev) => ({
      ...prev,
      title: value,
      slug: slugTouched ? prev.slug : slugify(value),
    }));
  };

  const addFeature = () => {
    const value = featureInput.trim();
    if (!value) return;
    setServiceForm((prev) => ({ ...prev, features: [...prev.features, value] }));
    setFeatureInput("");
  };

  const removeFeature = (index) => {
    setServiceForm((prev) => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  };

  const validateService = () => {
    const errs = {};
    if (!serviceForm.title.trim()) errs.title = "Title is required";
    if (!serviceForm.category) errs.category = "Category is required";
    setServiceErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    if (!validateService()) return;
    setServiceSaving(true);
    try {
      const payload = { ...serviceForm, slug: serviceForm.slug || slugify(serviceForm.title) };
      const res = await fetch(`${API}/api/services${editingServiceId ? `/${editingServiceId}` : ""}`, {
        method: editingServiceId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Save failed");
      showToast(editingServiceId ? "Service updated" : "Service added");
      closeServiceModal();
      await fetchAll();
    } catch (err) {
      console.error(err);
      showToast(err.message || "Failed to save service", "error");
    } finally {
      setServiceSaving(false);
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      const res = await fetch(`${API}/api/services/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setServices((prev) => prev.filter((s) => s._id !== id));
      showToast("Service deleted");
    } catch (err) {
      console.error(err);
      showToast(err.message || "Failed to delete service", "error");
    }
  };

  const handleToggleServiceActive = async (item) => {
    try {
      const res = await fetch(`${API}/api/services/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !item.isActive }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      setServices((prev) => prev.map((s) => (s._id === item._id ? data.service : s)));
      showToast("Service status updated");
    } catch (err) {
      console.error(err);
      showToast(err.message || "Failed to update status", "error");
    }
  };

  const moveService = async (item, direction) => {
    const catId = item.category?._id || item.category;
    const siblings = services
      .filter((s) => (s.category?._id || s.category) === catId)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
    const index = siblings.findIndex((s) => s._id === item._id);
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= siblings.length) return;
    const a = siblings[index];
    const b = siblings[targetIndex];
    try {
      await Promise.all([
        fetch(`${API}/api/services/${a._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: b.order ?? targetIndex }),
        }),
        fetch(`${API}/api/services/${b._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: a.order ?? index }),
        }),
      ]);
      await fetchAll();
    } catch (err) {
      console.error(err);
      showToast("Failed to reorder services", "error");
    }
  };

  const filteredServices = useMemo(() => {
    return services.filter((item) => {
      const catId = item.category?._id || item.category;
      if (serviceCategoryFilter !== "all" && catId !== serviceCategoryFilter) return false;
      if (!serviceSearch.trim()) return true;
      const term = serviceSearch.toLowerCase();
      return (
        item.title?.toLowerCase().includes(term) ||
        item.shortDescription?.toLowerCase().includes(term)
      );
    });
  }, [services, serviceSearch, serviceCategoryFilter]);

  return (
    <div>
      <PageHeader
        title="Service Catalog"
        subtitle="Manage the categories and services shown on the public Services page."
      />

      <Tabs defaultValue="categories">
        <TabsList className="mb-6">
          <TabsTrigger value="categories">Categories ({categories.length})</TabsTrigger>
          <TabsTrigger value="services">Services ({services.length})</TabsTrigger>
        </TabsList>

        {/* ---------------- Categories Tab ---------------- */}
        <TabsContent value="categories">
          <AdminCard style={{ padding: 20 }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold tracking-wide uppercase" style={{ color: "var(--text)" }}>
                Categories
              </h2>
              <AdminButton variant="primary" icon={Plus} onClick={openAddCategory}>
                Add Category
              </AdminButton>
            </div>

            {loading ? (
              <Skeleton variant="card" count={4} />
            ) : sortedCategories.length === 0 ? (
              <EmptyState message="No categories yet. Add your first one (e.g. SEO, SMO, Performance Marketing)." />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 adm-stagger">
                {sortedCategories.map((item, index) => (
                  <AdminCard hover key={item._id} className="p-4 flex gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-semibold truncate" style={{ color: "var(--text)" }}>
                          {item.name}
                        </h4>
                        <span className={`adm-badge ${item.isActive ? "adm-badge-success" : "adm-badge-danger"}`}>
                          {item.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <p className="text-xs mt-1" style={{ color: "var(--text-light)" }}>
                        /{item.slug} &middot; {serviceCountByCategory[item._id] || 0} service(s)
                      </p>
                      {item.description && (
                        <p className="text-xs mt-1 line-clamp-2" style={{ color: "var(--text-light)" }}>
                          {item.description}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5 shrink-0">
                      <button type="button" onClick={() => moveCategory(index, -1)} disabled={index === 0} className="adm-icon-btn" title="Move up">
                        <ArrowUp size={14} />
                      </button>
                      <button type="button" onClick={() => moveCategory(index, 1)} disabled={index === sortedCategories.length - 1} className="adm-icon-btn" title="Move down">
                        <ArrowDown size={14} />
                      </button>
                      <button type="button" onClick={() => handleToggleCategoryActive(item)} className="adm-icon-btn" title={item.isActive ? "Deactivate" : "Activate"}>
                        {item.isActive ? "⏻" : "✓"}
                      </button>
                      <button type="button" onClick={() => openEditCategory(item)} className="adm-icon-btn" title="Edit">
                        <Pencil size={14} />
                      </button>
                      <button type="button" onClick={() => handleDeleteCategory(item._id)} className="adm-icon-btn danger" title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </AdminCard>
                ))}
              </div>
            )}
          </AdminCard>
        </TabsContent>

        {/* ---------------- Services Tab ---------------- */}
        <TabsContent value="services">
          <AdminCard style={{ padding: 20 }}>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h2 className="text-sm font-semibold tracking-wide uppercase" style={{ color: "var(--text)" }}>
                Services
              </h2>
              <AdminButton variant="primary" icon={Plus} onClick={openAddService} disabled={categories.length === 0}>
                Add Service
              </AdminButton>
            </div>

            {categories.length === 0 && (
              <p className="text-xs mb-4" style={{ color: "var(--text-light)" }}>
                Add at least one category before creating services.
              </p>
            )}

            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-light)" }} />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={serviceSearch}
                  onChange={(e) => setServiceSearch(e.target.value)}
                  className="adm-input"
                  style={{ paddingLeft: 32 }}
                />
              </div>
              <select
                className="adm-select"
                style={{ maxWidth: 220 }}
                value={serviceCategoryFilter}
                onChange={(e) => setServiceCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {loading ? (
              <Skeleton variant="card" count={4} />
            ) : filteredServices.length === 0 ? (
              <EmptyState message="No services match. Add a service to get started." />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 adm-stagger">
                {filteredServices.map((item) => (
                  <AdminCard hover key={item._id} className="p-4 flex gap-3">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden shrink-0" style={{ border: "1px solid var(--border)", background: "var(--bg)" }}>
                      {item.image ? <img src={item.image} alt={item.title} className="w-full h-full object-cover" /> : <ImageIcon size={18} style={{ color: "var(--text-light)" }} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-semibold truncate" style={{ color: "var(--text)" }}>
                          {item.title}
                        </h4>
                        <span className={`adm-badge ${item.isActive ? "adm-badge-success" : "adm-badge-danger"}`}>
                          {item.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <p className="text-xs mt-1" style={{ color: "var(--text-light)" }}>
                        {categoryById[item.category?._id || item.category]?.name || item.category?.name || "Uncategorized"}
                      </p>
                      {item.shortDescription && (
                        <p className="text-xs mt-1 line-clamp-2" style={{ color: "var(--text-light)" }}>
                          {item.shortDescription}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5 shrink-0">
                      <button type="button" onClick={() => moveService(item, -1)} className="adm-icon-btn" title="Move up">
                        <ArrowUp size={14} />
                      </button>
                      <button type="button" onClick={() => moveService(item, 1)} className="adm-icon-btn" title="Move down">
                        <ArrowDown size={14} />
                      </button>
                      <button type="button" onClick={() => handleToggleServiceActive(item)} className="adm-icon-btn" title={item.isActive ? "Deactivate" : "Activate"}>
                        {item.isActive ? "⏻" : "✓"}
                      </button>
                      <button type="button" onClick={() => openEditService(item)} className="adm-icon-btn" title="Edit">
                        <Pencil size={14} />
                      </button>
                      <button type="button" onClick={() => handleDeleteService(item._id)} className="adm-icon-btn danger" title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </AdminCard>
                ))}
              </div>
            )}
          </AdminCard>
        </TabsContent>
      </Tabs>

      {/* ---------------- Category Modal ---------------- */}
      <Modal open={categoryModalOpen} onClose={closeCategoryModal} title={editingCategoryId ? "Edit Category" : "Add New Category"}>
        <form onSubmit={handleCategorySubmit} className="space-y-4">
          <Field label="Name" error={categoryErrors.name}>
            <TextInput
              value={categoryForm.name}
              onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
              placeholder="e.g. SEO"
            />
          </Field>
          <Field label="Description">
            <TextArea
              rows={4}
              value={categoryForm.description}
              onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
              placeholder="Short description shown under the category heading"
            />
          </Field>
          <label className="flex items-center gap-2 text-sm" style={{ color: "var(--text)" }}>
            <input
              type="checkbox"
              checked={categoryForm.isActive}
              onChange={(e) => setCategoryForm({ ...categoryForm, isActive: e.target.checked })}
            />
            Active (visible on the public site)
          </label>
          <AdminButton type="submit" variant="primary" icon={editingCategoryId ? Save : Plus} loading={categorySaving}>
            {editingCategoryId ? "Update Category" : "Add Category"}
          </AdminButton>
        </form>
      </Modal>

      {/* ---------------- Service Modal ---------------- */}
      <Modal open={serviceModalOpen} onClose={closeServiceModal} title={editingServiceId ? "Edit Service" : "Add New Service"}>
        <form onSubmit={handleServiceSubmit} className="space-y-4">
          <Field label="Category" error={serviceErrors.category}>
            <select
              className="adm-select"
              value={serviceForm.category}
              onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
            >
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Title" error={serviceErrors.title}>
            <TextInput value={serviceForm.title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="e.g. AI SEO Services" />
          </Field>

          <Field label="Slug / URL">
            <TextInput
              value={serviceForm.slug}
              onChange={(e) => {
                setSlugTouched(true);
                setServiceForm({ ...serviceForm, slug: slugify(e.target.value) });
              }}
              placeholder="auto-generated-from-title"
            />
          </Field>

          <Field label="Short Description">
            <TextArea
              rows={2}
              value={serviceForm.shortDescription}
              onChange={(e) => setServiceForm({ ...serviceForm, shortDescription: e.target.value })}
              placeholder="One or two lines shown on the service card"
            />
          </Field>

          <Field label="Long Description">
            <TextArea
              rows={6}
              value={serviceForm.longDescription}
              onChange={(e) => setServiceForm({ ...serviceForm, longDescription: e.target.value })}
              placeholder="Full content for the service detail page"
            />
          </Field>

          <ImageInput label="Image" value={serviceForm.image} onChange={(url) => setServiceForm({ ...serviceForm, image: url })} />
          <ImageInput label="Icon" value={serviceForm.icon} onChange={(url) => setServiceForm({ ...serviceForm, icon: url })} />

          <Field label="Features">
            <div className="flex gap-2 mb-2">
              <TextInput
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addFeature();
                  }
                }}
                placeholder="Type a feature and press Enter"
              />
              <AdminButton type="button" variant="secondary" onClick={addFeature}>
                Add
              </AdminButton>
            </div>
            {serviceForm.features.length > 0 && (
              <ul className="space-y-1.5">
                {serviceForm.features.map((f, i) => (
                  <li key={i} className="flex items-center justify-between text-sm px-3 py-2 rounded-lg" style={{ background: "var(--bg)", color: "var(--text)" }}>
                    <span>{f}</span>
                    <button type="button" onClick={() => removeFeature(i)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field label="CTA Button Text">
              <TextInput value={serviceForm.ctaText} onChange={(e) => setServiceForm({ ...serviceForm, ctaText: e.target.value })} />
            </Field>
            <Field label="CTA Button Link">
              <TextInput value={serviceForm.ctaLink} onChange={(e) => setServiceForm({ ...serviceForm, ctaLink: e.target.value })} placeholder="/contact" />
            </Field>
          </div>

          <Field label="SEO Meta Title">
            <TextInput value={serviceForm.metaTitle} onChange={(e) => setServiceForm({ ...serviceForm, metaTitle: e.target.value })} />
          </Field>
          <Field label="SEO Meta Description">
            <TextArea rows={2} value={serviceForm.metaDescription} onChange={(e) => setServiceForm({ ...serviceForm, metaDescription: e.target.value })} />
          </Field>

          <label className="flex items-center gap-2 text-sm" style={{ color: "var(--text)" }}>
            <input
              type="checkbox"
              checked={serviceForm.isActive}
              onChange={(e) => setServiceForm({ ...serviceForm, isActive: e.target.checked })}
            />
            Active (visible on the public site)
          </label>

          <AdminButton type="submit" variant="primary" icon={editingServiceId ? Save : Plus} loading={serviceSaving}>
            {editingServiceId ? "Update Service" : "Add Service"}
          </AdminButton>
        </form>
      </Modal>
    </div>
  );
}

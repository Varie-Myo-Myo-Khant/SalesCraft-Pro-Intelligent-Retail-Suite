package com.Retails.POS.Controllers;

import com.Retails.POS.Models.Category;
import com.Retails.POS.Security.Service.UserDetailsImpl;
import com.Retails.POS.Services.CategoryServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryServices categoryServices;

    @GetMapping("/")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<List<Category>> getCategory() {
        List<Category> categoryList = categoryServices.getAllCateogry();
        return ResponseEntity.ok(categoryList);
    }

    @GetMapping("/search/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Category> getCategoryById(@PathVariable String id) {
        Category category = categoryServices.getCategoryById(id);
        return ResponseEntity.ok(category);
    }

    @PostMapping("/")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Category> saveCategory(@RequestBody Category category) {
        Category savedCategory = categoryServices.saveCateogry(category);
        return ResponseEntity.ok(savedCategory);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<Category> updateCategory(@RequestBody Category category,
                                                   @PathVariable String id) {

        category.setId(id);
        Category updatedCategory = categoryServices.saveCateogry(category);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteCategory(@PathVariable String id) {
        categoryServices.deleteCategory(id);
        return ResponseEntity.ok("Category deleted successfully");
    }
}

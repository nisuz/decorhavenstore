import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X,
  Home,
  LogOut
} from "lucide-react";
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        
        <div className="flex items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Home className="h-6 w-6 text-decor-terracotta" />
            <span className="hidden font-serif text-xl font-bold sm:inline-block">
              DecorHaven
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium transition-all hover:text-primary">
              Home
            </Link>
            <Link to="/shop" className="text-sm font-medium transition-all hover:text-primary">
              Shop
            </Link>
            <Link to="/categories" className="text-sm font-medium transition-all hover:text-primary">
              Categories
            </Link>
            <Link to="/about" className="text-sm font-medium transition-all hover:text-primary">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium transition-all hover:text-primary">
              Contact
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={toggleSearch}>
            <Search className="h-5 w-5" />
          </Button>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-1">
              <Link to="/account">
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline-block">{user?.name.split(' ')[0]}</span>
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span className="hidden md:inline-block">Login</span>
              </Button>
            </Link>
          )}
          
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" aria-label="Shopping cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-fade-in md:hidden bg-background">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/shop" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
              Shop
            </Link>
            <Link to="/categories" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
              Categories
            </Link>
            <Link to="/about" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link to="/contact" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/account" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                  My Account
                </Link>
                <Button variant="outline" className="text-lg font-medium" onClick={() => {logout(); setIsMenuOpen(false);}}>
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
      
      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="container absolute top-16 left-0 right-0 bg-background p-4 border-b shadow-md animate-fade-in">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search products..."
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              autoFocus
            />
            <Button className="ml-2" onClick={toggleSearch}>Search</Button>
          </div>
        </div>
      )}
    </header>
  );
}
